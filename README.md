# Energiportalen

## Requirements
- MySQL installed
 - Port: 8889

## Setup Queries
- ```mysql
    CREATE DATABASE energiportalen CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    CREATE DATABASE energiportalen_test CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
- `ADD_USERS` in `backend/assets/Queries.js`
- `GRANT_USERS` in `backend/assets/Queries.js`
- `POPULATE_USERS` in `backend/assets/Queries.js`

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
