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
      test: `
      INSERT INTO si_units 
        (id, name, description, symbol, normalize)
      VALUES
        (1,'SI Unit 1','Unit 1','U1',1),
        (2,'Kilo SI Unit 1','1000 Unit 1','kU1',1000),
        (3,'SI Unit 2','Unit 2','U2',1),
        (4,'Micro SI Unit 2','10^-6 Unit 2','U2', 0.000001);
    `,
      dev: `
      INSERT INTO si_units 
        (id, name, description, symbol, normalize)
      VALUES
        (1,'Volt','Charge','V',1),
        (2,'Ampere','Current','A',1),
        (3,'Watt','Energy','W',1),
        (4,'Volt-Ampere Reactive','Reactive power is expressed in an AC electric power system','var',1),
        (5,'Volt-Ampere','Used for the apparent power in an electrical circuit','VA',1),
        (6,'Kilowatt Hour','A derived unit of energy equal to 3.6 megajoules','kWh',1000),
        (7,'Kilowatt',NULL,'kW',1000),
        (8,'Kilovolt-Ampere Reactive','','kvar',1000),
        (9,'Kilovolt-Ampere','Used for the apparent power in an electrical circuit','kVA',1000),
        (10,'Hertz','One cycle per second','Hz',1),
        (11,'Watt Hour',NULL,'Wh',1),
        (12,'Volt-Ampere Reactive Hour','','varh',1),
        (13,'Degree',NULL,'°',1),
        (14,'Celsius Degree',NULL,'°C',1),
        (15,'Metre per Second','','m/s',1),
        (16,'Millimetre','A unit of length in the metric system, equal to one thousandth of a metre','mm',0.001),
        (17,'Millimetre per Hour',NULL,'mm/h',1),
        (18,'Pascal','It is defined as one newton per square metre. Measures pressure.','Pa',1),
        (19,'Hectopascal','','hPa',100),
        (20,'Second','It is qualitatively defined as the second division of the hour by sixty','s',1);
    `
    }
  }, {
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
      test: `
        INSERT INTO block_types 
          (id, constant, name, description)
        VALUES
          (1,'ILLU_ONE','Illustration One','First edition'),
          (2,'ILLU_TWO','Illustration Two','Second edition'),
          (3,'ONE','First one','First one after the second edition'),
          (4,'TWO','Second one','Second one after the first one');
      `,
      dev: `
        INSERT INTO block_types 
          (id, constant, name, description)
        VALUES
          (1,'ILLU_PHONE','Smartphones Charged','The number of smartphones charged on the equivalent energy production.'),
          (2,'ILLU_SCOOTER','Scooter Tours around Earth','The number of tours around earth an electrical scooter could travel in the equivalent energy production'),
          (3,'LINE','Line Plot',NULL),
          (4,'TABLE','Data Table',NULL),
          (5,'BAR','Bar Plot',NULL);
      `
    }
  }, {
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
      (id, email, password, name)
    VALUES
      -- password: ***REMOVED***
      (1, 'admin@sunlabs.se', '***REMOVED***','Admin Sunlabs'),
      (2, 'user@sunlabs.se', '***REMOVED***', 'User Sunlabs'),
      (3, 'user@company.se', '***REMOVED***', 'User Company'),
      (4, 'admin@company.se', '***REMOVED***', 'Admin Company');
    `
    }
  }, {
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
        (id, unit_id, name, log_no, notes, si_unit_id)
      VALUES
        (82,4,'F15_AS3_MQ41_I1',1,'Ström i Ampere fas 1, adr 3000',2),
        (83,4,'F15_AS3_MQ41_I2',1,'Ström i Ampere fas 2, adr 3002',2),
        (84,4,'F15_AS3_MQ41_I3',1,'Ström i Ampere fas 3, adr 3004',2),
        (85,4,'F15_AS3_MQ41_U1_U2',1,'Spänning L1-L2 i Volt, adr 3020',1),
        (86,4,'F15_AS3_MQ41_U2_U3',1,'Spänning L2-L3 i Volt, adr 3022',1),
        (87,4,'F15_AS3_MQ41_U3_U1',1,'Spänning L3-L1 i Volt, adr 3024',1),
        (88,4,'F15_AS3_MQ41_P1',2,'Effekt fas 1 i kW, adr 3054',7),
        (89,4,'F15_AS3_MQ41_P2',2,'Effekt fas 2 i kW, adr 3056',7),
        (90,4,'F15_AS3_MQ41_P3',2,'Effekt fas 3 i kW, adr 3058',7),
        (91,4,'F15_AS3_MQ41_PVAR',2,'Total reaktiv effekt i kVAR, adr 3068',8),
        (92,4,'F15_AS3_MQ41_PVA',2,'Total apparent effekt i kVA, adr 3076',9),
        (93,4,'F15_AS3_MQ41_Pfa',2,'Effektfaktor , adr 3084',NULL),
        (94,4,'F15_AS3_MQ41_HZ',3,'Frekvens , adr 3110',10),
        (95,4,'F15_AS3_MQ41_WHAI',3,'Total aktiv energi import i Wh, adr 45100',11),
        (96,4,'F15_AS3_MQ41_WHAE',3,'Total aktiv energi export i Wh, adr 45102',11),
        (97,4,'F15_AS3_MQ41_VARHI',3,'Total reaktiv energi import i VARh, adr 45104',12),
        (98,4,'F15_AS3_MQ41_VARHE',3,'Total reaktiv energi export i VARh, adr 45106',12),
        (99,4,'F15_AS3_MQ41_WHPAI',3,'Partial aktiv energi import i Wh, adr 45108',11),
        (100,4,'F15_AS3_MQ41_WHPAE',4,'Partial reaktiv energi import i Wh, adr 45110',11),
        (101,4,'F15_AS3_MQ41_WHAEI1',4,'Aktiv energi import i Wh fas 1, adr 45112',11),
        (102,4,'F15_AS3_MQ41_WHAEI2',4,'Aktiv energi import i Wh fas 2, adr 45114',11),
        (103,4,'F15_AS3_MQ41_WHAEI3',4,'Aktiv energi import i Wh fas 3, adr 45116',11),
        (104,5,'F15_AS3_GW3U_Dn',1,'Wind direction minimum (D = degrees)',13),
        (105,5,'F15_AS3_GW3U_Dm',1,'Wind direction average (D = degrees)',13),
        (106,5,'F15_AS3_GW3U_Dx',1,'Wind direction maximum (D = degrees',13),
        (107,5,'F15_AS3_GW3U_Sn',1,'Wind speed minimum (M = m/S)',15),
        (108,5,'F15_AS3_GW3U_Sm',1,'Wind speed average (M = m/S)',15),
        (109,5,'F15_AS3_GW3U_Sx',1,'Wind speed maximum (M = m/S)',15),
        (110,5,'F15_AS3_GW3U_Ta',2,'Air temperature (C = °C)',14),
        (111,5,'F15_AS3_GW3U_Tp',2,'Internal temperature (C = °C)',14),
        (112,5,'F15_AS3_GW3U_Ua',2,'Relative humidity (P = % RH)',NULL),
        (113,5,'F15_AS3_GW3U_Pa',2,'Air pressure (H = hPa)',19),
        (114,5,'F15_AS3_GW3U_Rc',2,'Rain accumulation (M = mm)',16),
        (115,5,'F15_AS3_GW3U_Rd',2,'Rain duration (S = S)',20),
        (116,5,'F15_AS3_GW3U_Ri',3,'Rain intensity (M = mm/h)',17),
        (117,5,'F15_AS3_GW3U_Hc',3,'Hail accumulation (M = hits/cm2)',NULL),
        (118,5,'F15_AS3_GW3U_Hd',3,'Hail duration (S = S)',20),
        (119,5,'F15_AS3_GW3U_Hi',3,'Hail intensity (M = hits/cm2h)',NULL),
        (120,5,'F15_AS3_GW3U_Rp',3,'Rain peak intensity (M = mm/h)',17),
        (121,5,'F15_AS3_GW3U_Hp',3,'Hail peak intensity (M = hits/cm2h)',NULL);
    `
    }
  }, {
    name: 'locations',
    create: `
    CREATE TABLE IF NOT EXISTS locations (
      id int(11) unsigned NOT NULL AUTO_INCREMENT,
      name varchar(255) NOT NULL,
      image varchar(255) DEFAULT NULL,
      description text,
      country varchar(11) DEFAULT NULL COMMENT 'ISO 3166-1 alpha-3',
      city varchar(60) DEFAULT NULL,
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
  }, {
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
  }, {
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
  }, {
    name: 'user_blocks',
    create: `
    CREATE TABLE IF NOT EXISTS user_blocks (
      id int(11) unsigned NOT NULL AUTO_INCREMENT,
      user_id int(11) unsigned NOT NULL,
      type_id int(11) unsigned NOT NULL,
      unit_id int(11) unsigned NOT NULL,
      key_id int(11) unsigned NOT NULL,
      time_interval varchar(32) DEFAULT NULL,
      timespan varchar(64) DEFAULT NULL,
      date_from date DEFAULT NULL,
      date_to date DEFAULT NULL,
      is_removed tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT 'If the block is removed or not',
      dashboard_index tinyint(4) unsigned DEFAULT NULL COMMENT 'The index of the dashboard',
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
  }, {
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
