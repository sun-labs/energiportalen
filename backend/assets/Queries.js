import Config from '../config';

class Queries {

  static getQueries(table) {
    table = table.toLowerCase();
    return Queries.TABLE_QUERIES.find((obj) => {
      return obj.name === table
    });
  }

  static getCreateQuery(table) {
    return Queries.getQueries(table).create;
  }

  static getPopulateQuery(table, env) {
    env = env.toLowerCase();
    return Queries.getQueries(table).populate[env];
  }

  static getIndexQueries(table) {
    return Queries.getQueries(table).index;
  }

  /**
  * Get DATE_FORMAT mask for interval
  */
  static getIntervalFormat(interval) {
    interval = interval.toLowerCase();
    return Queries.INTERVAL_FORMATS[interval];
  }

}

Queries.INTERVAL_FORMATS = {
  min: '%Y-%m-%d %H:%i:00',
  hour: '%Y-%m-%d %H:00:00',
  day: '%Y-%m-%d 00:00:00',
  raw: '%Y-%m-%d %H:%i:%s'
}

Queries.TABLE_QUERIES = [
{
  name: 'units',
  create: `
    CREATE TABLE IF NOT EXISTS units (
      id int(11) unsigned NOT NULL AUTO_INCREMENT,
      name varchar(255) NOT NULL DEFAULT '',
      PRIMARY KEY (id)
    ) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
  `,
  populate: {
    test: `
    INSERT INTO units 
      (id, name)
    VALUES
      (1, 'Unit1')
      ,(2, 'Unit2')
      ,(3, 'Unit3')
      ,(4, 'Unit4')
      ,(5, 'Unit5')
      ,(6, 'Unit6');
    `,
    dev: `
    INSERT INTO units 
      (id, name)
    VALUES
      (4,'Schneider'),
      (5,'Vader'),
      (6,'Sun Labs');
    `
  }
},
{
  name: 'si_units',
  create: `
    CREATE TABLE IF NOT EXISTS si_units (
      id int(11) unsigned NOT NULL AUTO_INCREMENT,
      name varchar(64) NOT NULL DEFAULT '',
      description text,
      symbol varchar(8) NOT NULL DEFAULT '',
      normalize float NOT NULL DEFAULT '1',
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
  `,
  populate: {
    test: undefined,
    dev: undefined
  }
},{
  name: 'companies',
  create: `
    CREATE TABLE IF NOT EXISTS companies (
      id int(11) unsigned NOT NULL AUTO_INCREMENT,
      name varchar(255) NOT NULL DEFAULT '',
      description text,
      logotype varchar(255) DEFAULT NULL,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
  `,
  populate: {
    test: undefined,
    dev: undefined
  }
},
{
  name: 'block_types',
  create: `
    CREATE TABLE IF NOT EXISTS block_types (
      id int(11) unsigned NOT NULL AUTO_INCREMENT,
      constant varchar(64) NOT NULL DEFAULT '',
      name varchar(255) NOT NULL DEFAULT '',
      description text,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
  `,
  populate: {
    test: undefined,
    dev: undefined
  }
},{
  name: 'users',
  create: `
      CREATE TABLE IF NOT EXISTS users (
        id int(11) unsigned NOT NULL AUTO_INCREMENT,
        email varchar(255) NOT NULL,
        password binary(60) NOT NULL,
        name varchar(255) DEFAULT NULL,
        birthday date DEFAULT NULL,
        PRIMARY KEY (id),
        UNIQUE KEY email (email)
      ) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
  `,
  index: [],
  populate: {
    test: `
    INSERT INTO users
      (id, email, password)
    VALUES
      -- password: ***REMOVED***
      (1, 'asdf@asdf.com', '***REMOVED***');
    `,
    dev: `
    INSERT INTO users
      (id, email, password)
    VALUES
      -- password: ***REMOVED***
      (1, 'asdf@asdf.com', '***REMOVED***');
    `
  }
},{
  name: 'unit_keys',
  create: `
    CREATE TABLE IF NOT EXISTS unit_keys (
      id int(11) unsigned NOT NULL AUTO_INCREMENT,
      unit_id int(11) unsigned NOT NULL,
      name varchar(255) NOT NULL DEFAULT '',
      log_no int(11) unsigned DEFAULT NULL,
      notes text,
      si_unit_id int(11) unsigned DEFAULT NULL,
      PRIMARY KEY (id),
      KEY unit_id (unit_id),
      KEY si_unit_id (si_unit_id),
      CONSTRAINT unit_keys_ibfk_1 FOREIGN KEY (unit_id) REFERENCES units (id),
      CONSTRAINT unit_keys_ibfk_2 FOREIGN KEY (si_unit_id) REFERENCES si_units (id)
    ) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
  `,
  populate: {
    test: `
    INSERT INTO unit_keys 
      (id, unit_id, name, log_no, notes)
    VALUES
      (1, 1, 'Key1', 0, 'NOTES'),
      (2, 1, 'Key2', 0, 'NOTES'),
      (3, 2, 'Key3', 0, 'NOTES'),
      (4, 2, 'Key4', 0, 'NOTES'),
      (5, 3, 'Key5', 0, 'NOTES');
    `,
    dev: `
    INSERT INTO unit_keys 
      (id, unit_id, name, log_no, notes)
    VALUES
      (82,4,'F15_AS3_MQ41_I1',1,NULL),
      (83,4,'F15_AS3_MQ41_I2',1,NULL),
      (84,4,'F15_AS3_MQ41_I3',1,NULL),
      (85,4,'F15_AS3_MQ41_U1_U2',1,NULL),
      (86,4,'F15_AS3_MQ41_U2_U3',1,NULL),
      (87,4,'F15_AS3_MQ41_U3_U1',1,NULL),
      (88,4,'F15_AS3_MQ41_P1',2,NULL),
      (89,4,'F15_AS3_MQ41_P2',2,NULL),
      (90,4,'F15_AS3_MQ41_P3',2,NULL),
      (91,4,'F15_AS3_MQ41_PVAR',2,NULL),
      (92,4,'F15_AS3_MQ41_PVA',2,NULL),
      (93,4,'F15_AS3_MQ41_Pfa',2,NULL),
      (94,4,'F15_AS3_MQ41_HZ',3,NULL),
      (95,4,'F15_AS3_MQ41_WHAI',3,NULL),
      (96,4,'F15_AS3_MQ41_WHAE',3,NULL),
      (97,4,'F15_AS3_MQ41_VARHI',3,NULL),
      (98,4,'F15_AS3_MQ41_VARHE',3,NULL),
      (99,4,'F15_AS3_MQ41_WHPAI',3,NULL),
      (100,4,'F15_AS3_MQ41_WHPAE',4,NULL),
      (101,4,'F15_AS3_MQ41_WHAEI1',4,NULL),
      (102,4,'F15_AS3_MQ41_WHAEI2',4,NULL),
      (103,4,'F15_AS3_MQ41_WHAEI3',4,NULL),
      (104,5,'F15_AS3_GW3U_Dn',1,NULL),
      (105,5,'F15_AS3_GW3U_Dm',1,NULL),
      (106,5,'F15_AS3_GW3U_Dx',1,NULL),
      (107,5,'F15_AS3_GW3U_Sn',1,NULL),
      (108,5,'F15_AS3_GW3U_Sm',1,NULL),
      (109,5,'F15_AS3_GW3U_Sx',1,NULL),
      (110,5,'F15_AS3_GW3U_Ta',2,NULL),
      (111,5,'F15_AS3_GW3U_Tp',2,NULL),
      (112,5,'F15_AS3_GW3U_Ua',2,NULL),
      (113,5,'F15_AS3_GW3U_Pa',2,NULL),
      (114,5,'F15_AS3_GW3U_Rc',2,NULL),
      (115,5,'F15_AS3_GW3U_Rd',2,NULL),
      (116,5,'F15_AS3_GW3U_Ri',3,NULL),
      (117,5,'F15_AS3_GW3U_Hc',3,NULL),
      (118,5,'F15_AS3_GW3U_Hd',3,NULL),
      (119,5,'F15_AS3_GW3U_Hi',3,NULL),
      (120,5,'F15_AS3_GW3U_Rp',3,NULL),
      (121,5,'F15_AS3_GW3U_Hp',3,NULL);
    `
  }
},{
  name: 'locations',
  create: `
    CREATE TABLE IF NOT EXISTS locations (
      id int(11) unsigned NOT NULL AUTO_INCREMENT,
      name varchar(255) NOT NULL,
      image varchar(255) DEFAULT NULL,
      description text,
      country varchar(11) DEFAULT NULL COMMENT 'ISO 3166-1 alpha-3',
      city varchar(60) DEFAULT NULL,
      n_panels int(11) unsigned DEFAULT NULL COMMENT 'Number of solar panels installed at the location',
      PRIMARY KEY (id)
    ) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
  `,
  populate: {
    test: `
    INSERT INTO locations 
      (id, name, image, description, country, city)
    VALUES
      (1, 'Akademiska Sjukhuset', NULL, 'The academic hospital of Uppsala has 50% of their roof covered with solar panels.', 'SWE', 'Uppsala'),
      (3, 'Origo', NULL, 'Panels on the roof are tilted 45 degrees (under construction).', 'SWE', 'Uppsala'),
      (2, 'Base10', NULL, 'Base is the place if youre among the top 1 per mille, the roof is covered in sunlight and happiness 24 hours a day.', 'SWE', 'Uppsala');
    `,
    dev: `
    INSERT INTO locations 
      (id, name, image, description, country, city)
    VALUES
      (1, 'Akademiska Sjukhuset', NULL, 'The academic hospital of Uppsala has 50% of their roof covered with solar panels.', 'SWE', 'Uppsala'),
      (3, 'Origo', NULL, 'Panels on the roof are tilted 45 degrees (under construction).', 'SWE', 'Uppsala'),
      (2, 'Base10', NULL, 'Base is the place if youre among the top 1 per mille, the roof is covered in sunlight and happiness 24 hours a day.', 'SWE', 'Uppsala');
    `
  }
},{
  name: 'unit_data',
  create: `
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
  `,
  index: [`
    CREATE INDEX unit_key_id
    ON unit_data (unit_key, unit_id, timestamp);
  `],
  populate: {
    test: `
    INSERT INTO unit_data 
      (id, unit_id, unit_key, value, timestamp)
    VALUES
      -- UNIT 1, KEY 1
      (1, 1, 1, 1.2, '2017-02-09 00:00:01'),
      (2, 1, 1, 2.0, '2017-02-09 00:00:02'),
      (3, 1, 1, 1.5, '2017-02-09 00:01:01'),
      (4, 1, 1, 1.5, '2017-02-09 00:01:02'),
      (14, 1, 1, 1.2, '2017-02-10 00:00:01'),
      (15, 1, 1, 2.0, '2017-02-10 00:00:02'),
      (16, 1, 1, 1.5, '2017-02-10 00:01:01'),
      (17, 1, 1, 1.5, '2017-02-10 00:01:02'),

      (18, 1, 1, 1.2, '2017-02-11 00:00:01'),
      (19, 1, 1, 2.0, '2017-02-11 01:00:02'),
      (20, 1, 1, 1.5, '2017-02-13 00:01:01'),
      (21, 1, 1, 1.5, '2017-02-13 01:01:02'),
      (22, 1, 1, 1.2, '2017-02-15 00:00:01'),
      (23, 1, 1, 2.0, '2017-02-15 01:00:02'),
      (24, 1, 1, 1.5, '2017-02-17 00:01:01'),
      (25, 1, 1, 1.5, '2017-02-17 01:01:02'),
      -- UNIT 2, KEY 3
      (5, 2, 3, 0.12, '2017-02-09 00:00:01'),
      (6, 2, 3, 0.20, '2017-02-09 00:00:01'),
      (7, 2, 3, 0.15, '2017-02-09 00:00:01'),
      -- UNIT 2, KEY 4
      (8, 2, 4, 10.0, '2017-02-09 00:00:01'),
      (9, 2, 4, 20.0, '2017-02-09 00:00:01'),
      (10, 2, 4, 15.0, '2017-02-09 00:00:01'),
      -- UNIT 3, KEY 5
      (11, 3, 5, 1000, '2017-02-09 00:00:01'),
      (12, 3, 5, 1121, '2017-02-09 00:00:01'),
      (13, 3, 5, 1200, '2017-02-09 00:00:01');
    `,
    dev: undefined
  }
},{
  name: 'unit_locations',
  create: `
    CREATE TABLE IF NOT EXISTS unit_locations (
      unit_id int(11) unsigned NOT NULL,
      location_id int(11) unsigned NOT NULL,
      PRIMARY KEY (unit_id, location_id),
      FOREIGN KEY (unit_id) REFERENCES units(id),
      FOREIGN KEY (location_id) REFERENCES locations(id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `,
  index: [],
  populate: {
    test: `
    INSERT INTO unit_locations 
      (unit_id, location_id)
    VALUES
      (1, 1),
      (2, 1),
      (3, 1),
      (4, 1),
      (5, 1),
      (6, 2);
    `,
    dev: `
    INSERT INTO unit_locations 
      (unit_id, location_id)
    VALUES
      (4, 1),
      (5, 1),
      (6, 2);
    `
  }
},{
  name: 'user_blocks',
  create: `
    CREATE TABLE IF NOT EXISTS user_blocks (
      id int(11) unsigned NOT NULL AUTO_INCREMENT,
      user_id int(11) unsigned NOT NULL,
      type_id int(11) unsigned NOT NULL,
      unit_id int(11) unsigned NOT NULL,
      key_id int(11) unsigned NOT NULL,
      \`interval\` varchar(32) DEFAULT NULL,
      timespan varchar(64) DEFAULT NULL,
      date_from date DEFAULT NULL,
      date_to date DEFAULT NULL,
      is_removed tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT 'If the block is removed or not',
      \`index\` tinyint(4) unsigned DEFAULT NULL COMMENT 'The index on the grid of the dashboard',
      PRIMARY KEY (id),
      KEY user_id (user_id),
      KEY type_id (type_id),
      KEY unit_id (unit_id),
      KEY key_id (key_id),
      CONSTRAINT user_blocks_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id),
      CONSTRAINT user_blocks_ibfk_2 FOREIGN KEY (type_id) REFERENCES block_types (id),
      CONSTRAINT user_blocks_ibfk_3 FOREIGN KEY (unit_id) REFERENCES units (id),
      CONSTRAINT user_blocks_ibfk_4 FOREIGN KEY (key_id) REFERENCES unit_keys (id)
    ) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
  `,
  index: [],
  populate: {
    test: undefined,
    dev: undefined
  }
},{
  name: 'company_users',
  create: `
    CREATE TABLE company_users (
      id int(11) unsigned NOT NULL AUTO_INCREMENT,
      user_id int(11) unsigned DEFAULT NULL,
      company_id int(11) unsigned DEFAULT NULL,
      PRIMARY KEY (id),
      KEY user_id (user_id),
      KEY company_id (company_id),
      CONSTRAINT company_users_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id),
      CONSTRAINT company_users_ibfk_2 FOREIGN KEY (company_id) REFERENCES companies (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
  `,
  index: [],
  populate: {
    test: undefined,
    dev: undefined
  }
}
];

Queries.TABLES = Queries.TABLE_QUERIES.map((tableQuery) => {
  return tableQuery.name;
});

export default Queries;
