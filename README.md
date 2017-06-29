# Energiportalen

## Requirements
- MySQL installed
 - Port: 8889

## Setup Queries

Run these queries in order (manually)
```mysql
    CREATE DATABASE energiportalen CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    CREATE DATABASE energiportalen_test CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    CREATE DATABASE energiportalen_dev CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

```mysql
    CREATE USER 'energiportalen'@'%' IDENTIFIED BY '***REMOVED***';
    CREATE USER 'wasabi'@'%' IDENTIFIED BY '***REMOVED***';
```

```mysql
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
      'wasabi'@'%';

    GRANT 
      ALL PRIVILEGES 
    ON 
      energiportalen_dev.*
    TO 
      'wasabi'@'%';
```

*Before you run this, make sure that all the dependencies are installed (section beneath)*

Run this in the root of the repo, will create tables and populate with dev data
```bash
npm run bootstrap
```

Last part is to import the `unit_data` data, have fun!

## How to run
- `npm install` (do this in backend/ and frontend/ as well)
- `npm run start`

## Dependencies
- `npm install -g no***REMOVED***n` to run and rerun javascript codes
- `npm install -g webpack` to compile es6 syntax
- `npm install -g mocha` to run frontend and backend tests
- `npm install -g create-react-app` to run and compile the frontend

## How to run tests
- `npm run test`, run frontend and backend tests
- `npm run test_be`, run backend tests
- `npm run test_fe`, run frontend tests
- `npm run test_fe`, run integration tests

### Trello
https://trello.com/b/WsRPCMmn/mvp

### Drive
https://drive.google.com/open?id=0B5DXqVE7Dn66WUhFZkFFZ3hOZU0

### Overleaf
https://www.overleaf.com/8813889qmfbzphnntbn

### Other apps
* Slack
* Google Calendar
* Figma
