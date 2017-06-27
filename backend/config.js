const config = {
  database: {
    dev: {
      host: '127.0.0.1',
      user: 'wasabi',
      password: '***REMOVED***',
      database: 'energiportalen_dev',
      port: 8889,
      multipleStatements: true
    }
  },
  mysql: {
    host: '127.0.0.1',
    user: 'energiportalen',
    password: '***REMOVED***',
    database: 'energiportalen',
    port: 8889
  },
  database_test: {
    host: '127.0.0.1',
    user: 'wasabi',
    password: '***REMOVED***',
    database: 'energiportalen_test',
    port: 8889,
    multipleStatements: true
  },
  bcrypt: {
    rounds: 10
  }
};

export const jwtSecret = '***REMOVED***';

export default config;