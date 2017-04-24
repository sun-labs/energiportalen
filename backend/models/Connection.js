import mysql from 'mysql';
import config from '../config.js';

let con = mysql.createConnection(config.mysql);
con.connect((error) => {
  if(!error) {
  console.log('sql connected');
  } else {
  console.log(error);
  }
});

export default con;