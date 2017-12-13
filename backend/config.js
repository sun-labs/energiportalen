const STANDARD = {
  bcrypt: {
    rounds: 10,
  },
  jwt: {
    ***REMOVED***: '***REMOVED***',
  },
}

const TEST = {
  database: {
    host: '127.0.0.1',
    user: 'wasabi',
    password: '***REMOVED***',
    database: 'energiportalen_test',
    port: 8889,
    multipleStatements: true
  },
}

const DEV = {
  database: {
    host: '127.0.0.1',
    user: 'wasabi',
    password: '***REMOVED***',
    database: 'energiportalen_dev',
    port: 8889,
    multipleStatements: true
  },
}

const PROD = {
  datebase: {
    host: "***REMOVED***", 
    user: "***REMOVED***", 
    password: '***REMOVED***', 
    database: 'energiportalen', 
    port: 3306,
  },
}

const configs = { TEST, DEV, PROD, };

const ENV = process.env.NODE_ENV ? process.env.NODE_ENV.toUpperCase() : undefined;
const config = Object.assign({}, STANDARD, configs[ENV]);

export default config;