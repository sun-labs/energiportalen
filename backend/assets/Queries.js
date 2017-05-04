class Queries {

  static getQuery(queryName) {

    queryName = queryName.toUpperCase();
    return Queries.getQueryFromList(queryName);

  }

  static getQueryFromList(queryName) {
    if (Queries.QUERIES[queryName]) {
      return Queries.QUERIES[queryName];
    } else {
      console.log(`[WARNING] No query named ${queryName}!`);
    }
  }

}

Queries.QUERIES = {
  CREATE_UNITS: `
    CREATE TABLE IF NOT EXISTS units (
      id int(11) unsigned NOT NULL AUTO_INCREMENT,
      name varchar(255) NOT NULL DEFAULT '',
      PRIMARY KEY (id)
    ) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
  `
  ,CREATE_UNIT_KEYS: `
    CREATE TABLE IF NOT EXISTS unit_keys (
      id int(11) unsigned NOT NULL AUTO_INCREMENT,
      unit_id int(11) unsigned NOT NULL,
      name varchar(255) NOT NULL DEFAULT '',
      log_no int(11) unsigned DEFAULT NULL,
      notes text,
      PRIMARY KEY (id),
      FOREIGN KEY (unit_id) REFERENCES units(id)
    ) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
  `
  ,CREATE_LOCATIONS: `
    CREATE TABLE IF NOT EXISTS locations (
      id int(11) unsigned NOT NULL AUTO_INCREMENT,
      name varchar(255) NOT NULL,
      image varchar(255) DEFAULT NULL,
      description text,
      country varchar(11) DEFAULT NULL COMMENT 'ISO 3166-1 alpha-3',
      city varchar(60) DEFAULT NULL,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
  `
  ,CREATE_UNIT_DATA: `
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
  `
  ,CREATE_UNIT_DATA_MINUTE: `
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
  `
  ,CREATE_UNIT_DATA_HOUR: `
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
  `
  ,CREATE_UNIT_DATA_DAY: `
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
  `
  ,CREATE_UNIT_LOCATIONS: `
    CREATE TABLE unit_locations (
      unit_id int(11) unsigned NOT NULL,
      location_id int(11) unsigned NOT NULL,
      PRIMARY KEY (unit_id, location_id),
      FOREIGN KEY (unit_id) REFERENCES units(id),
      FOREIGN KEY (location_id) REFERENCES locations(id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `
  ,CREATE_USERS: `
      CREATE TABLE IF NOT EXISTS users (
        id int(11) unsigned NOT NULL AUTO_INCREMENT,
        email varchar(255) NOT NULL,
        password BINARY (60) NOT NULL,
        PRIMARY KEY (id),
        UNIQUE (email)
      ) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
  `
  ,POPULATE_UNITS_TEST: `
    INSERT INTO units 
      (id, name)
    VALUES
      (1, 'Unit1'),
      (2, 'Unit2'),
      (3, 'Unit3');
  `
  ,POPULATE_UNIT_KEYS_TEST: `
    INSERT INTO unit_keys 
      (id, unit_id, name, log_no, notes)
    VALUES
      (1, 1, 'Key1', 0, 'NOTES'),
      (2, 1, 'Key2', 0, 'NOTES'),
      (3, 2, 'Key3', 0, 'NOTES'),
      (4, 2, 'Key4', 0, 'NOTES'),
      (5, 3, 'Key5', 0, 'NOTES');
  `
  ,POPULATE_UNIT_DATA_TEST: `
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
  `
  ,POPULATE_USERS_TEST: `
    INSERT INTO users
      (id, email, password)
    VALUES
      -- password: ***REMOVED***
      (1, 'asdf@asdf.com', '***REMOVED***');
  `
  ,POPULATE_LOCATIONS_TEST: `
    INSERT INTO locations 
      (id, name, image, description, country, city)
    VALUES
      (1, 'Akademiska Sjukhuset', NULL, 'The academic hospital of Uppsala has 50% of their roof covered with solar panels.', 'SWE', 'Uppsala'),
      (3, 'Origo', NULL, 'Panels on the roof are tilted 45 degrees (under construction).', 'SWE', 'Uppsala'),
      (2, 'Base10', NULL, 'Base is the place if youre among the top 1 per mille, the roof is covered in sunlight and happiness 24 hours a day.', 'SWE', 'Uppsala');
  `
};

// NOTE: these are listed in the order they depend on each other (FOREIGN KEY etc).
Queries.TABLES = [
  'users'
  , 'locations'
  , 'units'
  , 'unit_keys'
  , 'unit_data'
  , 'unit_data_minute'
  , 'unit_data_hour'
  , 'unit_data_day'
  , 'unit_locations'
];

export default Queries;