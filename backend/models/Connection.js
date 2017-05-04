import mysql from 'mysql';
import Config from '../config';
import Queries from '../assets/Queries';

class Connection {

  constructor(ENV = 'TEST') {
    this.ENV = ENV.toUpperCase();
  }

  init(cb) {
    Connection.connect(this.ENV, (err, con) => {
      this.con = con;
      cb(err);
    });
  }

  unsafeEnv() {
    return (this.ENV !== 'TEST');
  }

  create(TABLE, cb) {
    const QUERY = Queries.getQuery(`CREATE_${TABLE}`);
    this.con.query({
      sql: QUERY
    }, (err, res) => {
      cb(err, res);
    });
  }

  populate(TABLE, cb) {
    const QUERY = Queries.getQuery(`POPULATE_${TABLE}`);
    if (QUERY) { // HACK, to skip the queries without data atm
      this.con.query({
        sql: QUERY
      }, (err, res) => {
        cb(err, res);
      });
    } else {
      cb();
    }
  }

  drop(TABLE, cb) {
    if (this.unsafeEnv()) { return cb(); }
    const QUERY = `
      SET FOREIGN_KEY_CHECKS = 0;
      DROP TABLE IF EXISTS ${TABLE}
    `;
    this.con.query({
      sql: QUERY
    }, (err, res) => {
      cb(err, res);
    });
  }

  clear(TABLE, cb) {
    if (this.unsafeEnv()) { return cb(); }

    const QUERY = `
      DELETE FROM ${TABLE};
    `;
    this.con.query({
      sql: QUERY
    }, (err, res) => {
      cb(err, res);
    });
  }

  // machokodning /V
  mapTables(tables, lambda, cb) {
    lambda = lambda.bind(this); // bind function to current scope
    const [table, ...rest] = tables; // grab first table and store rest
    if(table) { // recursive case
      lambda(table, (err, res) => { // call lambda function
        if (!err) { // no error, continue
          this.mapTables(rest, lambda, cb); // recursive call
        } else { // error, return it
          return cb(err);
        }
      });
    } else { // base case
      if (cb) { cb(); }
    }
  }

  dropAllTables(cb) {
    this.mapTables(Queries.TABLES, this.drop, cb);
  }

  clearAllTables(cb) {
    this.mapTables(Queries.TABLES, this.clear, cb);
  }
  populateAllTables(cb) {
    const tables = Queries.TABLES.map((table) => {
      return `${table}_${this.ENV}`;
    });
    this.mapTables(tables, this.populate, cb);
  }
  createAllTables(cb) {
    this.mapTables(Queries.TABLES, this.create, cb);
  }

  /*
  * STATIC FUNCTIONS
  */

  static connect(ENV = 'DEV', cb) {
    let dbConfig;
    switch (ENV) {
      case 'TEST':
        dbConfig = Config.database_test;
        break;
      default:
        dbConfig = Config.mysql;
        break;
    }
    const connection = mysql.createConnection(dbConfig);
    connection.connect((err) => {
      console.log(`[${ENV}] Database Connected`);
      return cb(err, connection);
    });
  };

}

console.log(`
  ${Queries.getQuery('CREATE_USERS')}
`);

export const connect = Connection.connect;
export default Connection;