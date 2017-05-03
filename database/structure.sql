-- DATABASE
CREATE DATABASE energiportalen CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE energiportalen_test CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- GRANTS
CREATE USER 'energiportalen'@'%' IDENTIFIED BY '***REMOVED***';
GRANT 
  ALL PRIVILEGES 
ON 
  energiportalen.* 
TO 
  'energiportalen'@'%';

GRANT 
  ALL PRIVILEGES 
ON 
  energiportalen_test.* 
TO 
  'energiportalen'@'%';

-- TABLES
USE energiportalen;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` BINARY (60) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `units` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `unit_keys` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `unit_id` int(11) unsigned NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT '',
  `log_no` int(11) unsigned DEFAULT NULL,
  `notes` text,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`unit_id`) REFERENCES units(id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `unit_data` (
  `id` bigint(11) unsigned NOT NULL AUTO_INCREMENT,
  `unit_id` int(11) unsigned NOT NULL,
  `unit_key` int(11) unsigned NOT NULL,
  `value` float NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`unit_id`) REFERENCES units(id),
  FOREIGN KEY (`unit_key`) REFERENCES unit_keys(id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `unit_data_minute` (
  `id` bigint(11) unsigned NOT NULL AUTO_INCREMENT,
  `unit_id` int(11) unsigned NOT NULL,
  `unit_key` int(11) unsigned NOT NULL,
  `value_avg` float NOT NULL,
  `value_sum` bigint(11) NOT NULL,
  `value_count` bigint(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`unit_id`) REFERENCES units(id),
  FOREIGN KEY (`unit_key`) REFERENCES unit_keys(id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `unit_data_hour` (
  `id` bigint(11) unsigned NOT NULL AUTO_INCREMENT,
  `unit_id` int(11) unsigned NOT NULL,
  `unit_key` int(11) unsigned NOT NULL,
  `value_avg` float NOT NULL,
  `value_sum` bigint(11) NOT NULL,
  `value_count` bigint(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`unit_id`) REFERENCES units(id),
  FOREIGN KEY (`unit_key`) REFERENCES unit_keys(id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `unit_data_day` (
  `id` bigint(11) unsigned NOT NULL AUTO_INCREMENT,
  `unit_id` int(11) unsigned NOT NULL,
  `unit_key` int(11) unsigned NOT NULL,
  `value_avg` float NOT NULL,
  `value_sum` bigint(11) NOT NULL,
  `value_count` bigint(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`unit_id`) REFERENCES units(id),
  FOREIGN KEY (`unit_key`) REFERENCES unit_keys(id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;