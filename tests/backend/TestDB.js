import { connect } from '../../backend/models/Connection.js';

const tables = [
  'units', 
  'unit_data', 
  'unit_data_day', 
  'unit_data_minute', 
  'unit_data_hour', 
  'unit_keys', 
  'users'
];

let con;

class TestDB {

  static connect(cb) {
    con = connect('TEST');
    cb();
  }

  static clearTableData(cb) {
    const statements = tables.map((table) => {
      return `DELETE FROM ${table}`;
    });
    const query = statements.join(';');
    con.query({
      sql: query
    }, (err, results) => {
      cb();
    });
  }
  
  static clearTables(cb) {

    const query = `
      SET FOREIGN_KEY_CHECKS = 0;
      DROP TABLE IF EXISTS ${tables.join(',')};
    `;
    con.query({
      sql: query
    }, (error, results) => {
      cb();
    });

  }

  static createUnits(cb) {
    const query = `
    CREATE TABLE IF NOT EXISTS units (
      id int(11) unsigned NOT NULL AUTO_INCREMENT,
      name varchar(255) NOT NULL DEFAULT '',
      PRIMARY KEY (id)
    ) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
    `;
    con.query({
      sql: query
    }, (error, results) => {
      cb();
    });
  }

  static populateUnits(cb) {
    const query = `
    INSERT INTO units 
      (id, name)
    VALUES
      (1, 'Unit1'),
      (2, 'Unit2'),
      (3, 'Unit3');
    `;
    con.query({
      sql: query
    }, (error, results) => {
      cb();
    });
  }

  static populateUnitKeys(cb) {
    const query = `
      INSERT INTO unit_keys 
        (id, unit_id, name, log_no, notes)
      VALUES
        (1, 1, 'Key1', 0, 'NOTES'),
        (2, 1, 'Key2', 0, 'NOTES'),
        (3, 2, 'Key3', 0, 'NOTES'),
        (4, 2, 'Key4', 0, 'NOTES'),
        (5, 3, 'Key5', 0, 'NOTES');
    `;
    con.query({
      sql: query
    }, (error, results) => {
      cb();
    });
  }

  static populateUsers(cb) {
    const query = `
      INSERT INTO users
        (id, email, password)
      VALUES
        -- password: ***REMOVED***
        (1, 'asdf@asdf.com', '***REMOVED***');
    `;
    con.query({
      sql: query
    }, (error, results) => {
      cb();
    });
  }

  static populateUnitData(cb) {
    const query = `
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
    con.query({
      sql: query
    }, (error, results) => {
      cb();
    });
  }

  static createUnitData(cb) {
    const query = `
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
    con.query({
      sql: query
    }, (error, results) => {
      cb();
    });
  }

  static createUnitKeys(cb) {
    const query = `
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
    con.query({
      sql: query
    }, (error, results) => {
      cb();
    });
  }

  static createUsers(cb) {
    const query = `
    CREATE TABLE IF NOT EXISTS users (
      id int(11) unsigned NOT NULL AUTO_INCREMENT,
      email varchar(255) NOT NULL,
      password BINARY (60) NOT NULL,
      PRIMARY KEY (id),
      UNIQUE (email)
    ) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
    `;
    con.query({
      sql: query
    }, (error, results) => {
      cb();
    });
  }

}

export default TestDB;