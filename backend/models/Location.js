import mysql from 'mysql';
import { con } from './Connection';

class Location {

  /*
  * CB: err, [location]
  */
  static getLocations(cb) {
    const query = `
      SELECT * FROM locations;
    `;
    con.query({ 
      sql: query
    }, (err, results) => {
      cb(err, results);
    });
  }
  
}

export default Location;