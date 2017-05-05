import mysql from 'mysql';
import Config from '../config';

const CREATE_UNITS = `
  CREATE TABLE IF NOT EXISTS units (
    id int(11) unsigned NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL DEFAULT '',
    PRIMARY KEY (id)
  ) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
`;

const CREATE_UNIT_KEYS = `
  CREATE TABLE IF NOT EXISTS unit_keys (
    id int(11) unsigned NOT NULL AUTO_INCREMENT,
    unit_id int(11) unsigned NOT NULL,
    name varchar(255) NOT NULL DEFAULT '',
    log_no int(11) unsigned DEFAULT NULL,
    notes text,
    PRIMARY KEY (id),
    FOREIGN KEY (unit_id) REFERENCES units(id)
  ) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
`;

const CREATE_UNIT_DATA = `
  CREATE TABLE IF NOT EXISTS unit_data (
    id bigint(11) unsigned NOT NULL AUTO_INCREMENT,
    unit_id int(11) unsigned NOT NULL,
    unit_key int(11) unsigned NOT NULL,
    value float NOT NULL,
    timestamp timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (unit_id) REFERENCES units(id),
    FOREIGN KEY (unit_key) REFERENCES unit_keys(id)
  ) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

  CREATE TABLE IF NOT EXISTS unit_data_minute (
    id bigint(11) unsigned NOT NULL AUTO_INCREMENT,
    unit_id int(11) unsigned NOT NULL,
    unit_key int(11) unsigned NOT NULL,
    value_avg float NOT NULL,
    value_sum bigint(11) NOT NULL,
    value_count bigint(11) NOT NULL,
    timestamp timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (unit_id) REFERENCES units(id),
    FOREIGN KEY (unit_key) REFERENCES unit_keys(id)
  ) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

  CREATE TABLE IF NOT EXISTS unit_data_hour (
    id bigint(11) unsigned NOT NULL AUTO_INCREMENT,
    unit_id int(11) unsigned NOT NULL,
    unit_key int(11) unsigned NOT NULL,
    value_avg float NOT NULL,
    value_sum bigint(11) NOT NULL,
    value_count bigint(11) NOT NULL,
    timestamp timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (unit_id) REFERENCES units(id),
    FOREIGN KEY (unit_key) REFERENCES unit_keys(id)
  ) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

  CREATE TABLE IF NOT EXISTS unit_data_day (
    id bigint(11) unsigned NOT NULL AUTO_INCREMENT,
    unit_id int(11) unsigned NOT NULL,
    unit_key int(11) unsigned NOT NULL,
    value_avg float NOT NULL,
    value_sum bigint(11) NOT NULL,
    value_count bigint(11) NOT NULL,
    timestamp timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (unit_id) REFERENCES units(id),
    FOREIGN KEY (unit_key) REFERENCES unit_keys(id)
  ) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
`;

const CREATE_USERS = `
  CREATE TABLE IF NOT EXISTS users (
    id int(11) unsigned NOT NULL AUTO_INCREMENT,
    email varchar(255) NOT NULL,
    password BINARY (60) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (email)
  ) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
`;

const POPULATE_UNITS = `
  INSERT INTO units 
    (id, name)
  VALUES
    (1, 'Unit1'),
    (2, 'Unit2'),
    (3, 'Unit3');
`;

const POPULATE_UNIT_KEYS = `
  INSERT INTO unit_keys 
    (id, unit_id, name, log_no, notes)
  VALUES
    (1, 1, 'Key1', 0, 'NOTES'),
    (2, 1, 'Key2', 0, 'NOTES'),
    (3, 2, 'Key3', 0, 'NOTES'),
    (4, 2, 'Key4', 0, 'NOTES'),
    (5, 3, 'Key5', 0, 'NOTES');
`;

const POPULATE_UNIT_DATA = `
  INSERT INTO unit_data 
    (id, unit_id, unit_key, value)
  VALUES
    -- UNIT 1, KEY 1
    (1, 1, 1, 1.2),
    (2, 1, 1, 2.0),
    (3, 1, 1, 1.5),
    (4, 1, 1, 1.5),
    -- UNIT 2, KEY 3
    (5, 2, 3, 0.12),
    (6, 2, 3, 0.20),
    (7, 2, 3, 0.15),
    -- UNIT 2, KEY 4
    (8, 2, 4, 10.0),
    (9, 2, 4, 20.0),
    (10, 2, 4, 15.0),
    -- UNIT 3, KEY 5
    (11, 3, 5, 1000),
    (12, 3, 5, 1121),
    (13, 3, 5, 1200);
`;

const POPULATE_USERS = `
  INSERT INTO users
    (id, email, password)
  VALUES
    -- password: ***REMOVED***
    (1, 'asdf@asdf.com', '***REMOVED***');
`;

class Connection {

  construct(ENV = 'TEST') {
    this.ENV = ENV;
    this.con = Connection.connect(ENV);
  }

  createUnits(cb) {
    const query = CREATE_UNITS;
    this.con.query({
      sql: query
    }, (error, results) => {
      cb();
    });
  }

  createUnitData(cb) {
    const query = CREATE_UNIT_DATA;
    this.con.query({
      sql: query
    }, (error, results) => {
      cb();
    });
  }

  createUnitKeys(cb) {
    const query = CREATE_UNIT_KEYS;
    this.con.query({
      sql: query
    }, (error, results) => {
      cb();
    });
  }

  createUsers(cb) {
    const query = CREATE_USERS;
    this.con.query({
      sql: query
    }, (error, results) => {
      cb();
    });
  }




  populateUnits(cb) {
    const query = POPULATE_UNITS;
    this.con.query({
      sql: query
    }, (error, results) => {
      cb();
    });
  }

  populateUnitKeys(cb) {
    const query = POPULATE_UNIT_KEYS;
    this.con.query({
      sql: query
    }, (error, results) => {
      cb();
    });
  }

  populateUsers(cb) {
    const query = POPULATE_USERS;
    this.con.query({
      sql: query
    }, (error, results) => {
      cb();
    });
  }

  populateUnitData(cb) {
    const query = POPULATE_UNIT_DATA;
    this.con.query({
      sql: query
    }, (error, results) => {
      cb();
    });
  }

  static connect(ENV = 'DEV') {
    let dbConfig;
    switch(ENV.toUpperCase()) {
      case 'TEST':
        dbConfig = Config.database_test;
      break;
      default:
        dbConfig = Config.mysql;
      break;
    }
    const connection = mysql.createConnection(dbConfig);
    connection.connect((error) => {
      if(!error) {
        console.log(`[${ENV}] Database Connected`);
      } else {
        console.log(error);
      }
    });
    return connection;
  };

}

export const con = Connection.connect(process.env.NODE_ENV);
export const connect = Connection.connect;
export default Connection;