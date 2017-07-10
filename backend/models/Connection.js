import mysql from 'mysql';
import Config from '../config';
import Queries from '../assets/Queries';

class Connection {

  constructor(ENV = 'TEST') {
    this.ENV = ENV.toUpperCase();
    this.FORCE_UNSAFE = false; // set to true to be able to drop / clear tables in DEV mode.
  }

  init(cb) {
    Connection.connect(this.ENV, (err, con) => {
      this.con = con;
      this.database = con.config.database;
      if(cb) {
        cb(err);
      }
    });
    return this;
  }

  safeEnv() {
    return (
      this.ENV === 'TEST' ||
      this.ENV === 'DEV' ||
      this.FORCE_UNSAFE === true
    );
  }

  /*
  * Pass queries to mysql
  */
  query(...args) {
    return this.con.query(...args);
  }

  /**
   * Create, index and populate a certain table.
   * @param {*} TABLE
   * @param {*} cb 
   */
  bootstrap(TABLE, cb) {
    this.create(TABLE, (err, res) => {
      if(err) { return cb(err); }
      this.index(TABLE, (err, res) => {
        if(err) { return cb(err); }
        this.populate(TABLE, (err, res) => {
          if(err) { 
            return cb(err); 
          } else {
            return cb(err, res);
          }
        });
      });
    });
  }

  /*
  * Index the table sent as an argument
  */
  index(TABLE, cb) {
    const QUERIES = Queries.getIndexQueries(TABLE);
    if(QUERIES && QUERIES.length > 0) {
      this.mapTables(QUERIES, this.exec, cb);
    } else {
      cb(); // no indexes to execute, return nada.
    }
  }

  /**
  * Query function as a lambda function, works to execute multiple sql statements in a row.
  * @param {*} QUERY 
  * @param {*} cb 
  */
  exec(QUERY, cb) {
    this.con.query({
      sql: QUERY
    }, (err, res) => {
      if(err) {
        err.continue = true; // mainly for indexes but is for the whole "exec function". Change if needed.
      }
      cb(err, res);
    });
  }

  /**
   * Create a table according to template
   * @param {*} TABLE 
   * @param {*} cb 
   */
  create(TABLE, cb) {
    const QUERY = Queries.getCreateQuery(TABLE);
    this.con.query({
      sql: QUERY
    }, (err, res) => {
      cb(err, res);
    });
  }

  /**
   * Populate table according to environment and table template
   * @param {*} TABLE 
   * @param {*} cb 
   */
  populate(TABLE, cb) {
    const QUERY = Queries.getPopulateQuery(TABLE, this.ENV);
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

  /**
   * Drop table completely from the database, it has a security check
   * @param {*} TABLE 
   * @param {*} cb 
   */
  drop(TABLE, cb) {
    if (!this.safeEnv()) { 
      return cb({ unsafe: true });
    }
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

  /**
   * Remove all data from a table, security check is implemented
   * @param {*} TABLE 
   * @param {*} cb 
   */
  clear(TABLE, cb) {
    if (!this.safeEnv()) { 
      return cb({ unsafe: true });
    }
    const QUERY = `
      SET FOREIGN_KEY_CHECKS = 0;
      DELETE FROM ${TABLE};
    `;
    this.con.query({
      sql: QUERY
    }, (err, res) => {
      cb(err, res);
    });
  }

  /**
   * Maps a certain function over a table, in this case table functions, lambda
   * has to be in the following format (TABLE, (err, res))
   * @param {*} tables 
   * @param {*} lambda 
   * @param {*} cb 
   */
  mapTables(tables, lambda, cb) {
    lambda = lambda.bind(this); // bind function to current scope
    const [table, ...rest] = tables; // grab first table and store rest
    if(table) { // recursive case
      lambda(table, (err, res) => { // call lambda function
        if (!err) { // no error, continue
          this.mapTables(rest, lambda, cb); // recursive call
        } else if (err && err.continue === true) { // if vague error (indexing for example, which can go on without being applied)
          console.log('[INFO] Error received but not fatal, continuing...');
          this.mapTables(rest, lambda, cb); // rec call.
        } else { // error, return it
          return cb(err);
        }
      });
    } else { // base case
      if (cb) { cb(); }
    }
  }

  /*
  * Functions
  */
  dropTables(tables, cb) {
    this.mapTables(tables, this.drop, cb);
  }
  clearTables(tables, cb) {
    this.mapTables(tables, this.clear, cb);
  }
  populateTables(tables, cb) {
    this.mapTables(tables, this.populate, cb);
  }
  createTables(tables, cb) {
    this.mapTables(tables, this.create, cb);
  }
  bootstrapTables(tables, cb) {
    this.mapTables(tables, this.bootstrap, cb);
  }
  
  /*
  * Fixed functions
  */
  dropAllTables(cb) {
    this.mapTables(Queries.TABLES, this.drop, cb);
  }
  clearAllTables(cb) {
    this.mapTables(Queries.TABLES, this.clear, cb);
  }
  populateAllTables(cb) {
    this.mapTables(Queries.TABLES, this.populate, cb);
  }
  createAllTables(cb) {
    this.mapTables(Queries.TABLES, this.create, cb);
  }
  bootstrapAllTables(cb) {
    this.mapTables(Queries.TABLES, this.bootstrap, cb);
  }

  /*
  * STATIC FUNCTIONS
  */

  static connect(ENV = 'TEST', cb) {
    let dbConfig;
    switch (ENV) {
      case 'TEST':
        dbConfig = Config.database_test;
        break;
      case 'DEV':
        dbConfig = Config.database.dev;
        break;
      default:
        dbConfig = Config.mysql;
        break;
    }
    const connection = mysql.createConnection(dbConfig);
    connection.connect((err) => {
      console.log(`[${ENV}] Database Connected`);
      cb(err, connection);
    });
  };

  /**
   * DEFAULT: interval = day
   */
  static getIntervalFormat(interval = 'day') {
    return Queries.getIntervalFormat(interval);
  }

}

export const con = new Connection(process.env.NODE_ENV).init();
export const connect = Connection.connect;
export default Connection;