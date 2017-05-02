import mysql from 'mysql';
import config from '../config.js';

const connect = (ENV) => {
  ENV = ENV || 'DEV';

  let dbConfig;
  switch(ENV.toUpperCase()) {
    case 'TEST':
      dbConfig = config.database_test;
    break;
    default:
      dbConfig = config.mysql;
    break;
  }
  const connection = mysql.createConnection(dbConfig);
  connection.connect((error) => {
    if(!error) {
      console.log(`[${ENV}] Database Connected`);
    } else {
      console.log(error);
    }
  });
  return connection;
};

const con = connect(process.env.NODE_ENV);

export { connect };
export default con;