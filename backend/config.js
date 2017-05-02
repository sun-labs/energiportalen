const config = {
  mysql: {
    host: '127.0.0.1',
    user: 'energiportalen',
    password: '***REMOVED***',
    database: 'energiportalen',
    port: 8889
  },
  database_test: {
    host: '127.0.0.1',
    user: 'energiportalen',
    password: '***REMOVED***',
    database: 'energiportalen_test',
    port: 8889,
    multipleStatements: true
  },
  bcrypt: {
    rounds: 10
  }
};

export default config;