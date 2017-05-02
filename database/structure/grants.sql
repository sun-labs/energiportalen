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