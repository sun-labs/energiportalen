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