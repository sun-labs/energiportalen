const STANDARD = {
  bcrypt: {
    rounds: 10
  },
  jwt: {
    ***REMOVED***: '' // TODO: Set jwt ***REMOVED***
  }
}

const TEST = {
  database: {
    host: '127.0.0.1',
    user: 'wasabi',
    password: '', // TODO: Set password for wasabi
    database: 'energiportalen_test',
    port: 8889,
    multipleStatements: true
  }
}

const DEV = {
  database: {
    host: '127.0.0.1',
    user: 'wasabi',
    password: '', // TODO: Set password for wasabi
    database: 'energiportalen_dev',
    port: 8889,
    multipleStatements: true
  }
}
// TODO: SET MYSQL VARIABLES
const PROD = {
  datebase: {
    host: '',
    user: '',
    password: '',
    database: '',
    port: 3306
  }
}

const configs = { TEST, DEV, PROD }

const ENV = process.env.NODE_ENV ? process.env.NODE_ENV.toUpperCase() : undefined
const config = Object.assign({}, STANDARD, configs[ENV])

export default config
