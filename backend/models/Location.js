import mysql from 'mysql';
import { con } from './Connection';

class Location {

  /*
  * CB: err, [location]
  */
  static getLocations(cb) {
    const QUERY = `
      SELECT * FROM locations as l
      INNER JOIN unit_locations ul
      ON l.id = ul.location_id
      INNER JOIN units as u
      ON u.id = ul.unit_id;
    `;
    con.query({
      sql: QUERY
    }, (err, res) => {
      cb(err, res);
    });
  }

  /*
  * CB: err, [location]
  */
  static getLocation(locationId, cb) {
    const QUERY = `
      SELECT *
      FROM locations
      WHERE id = ?;
    `;
    const P_QUERY = mysql.format(QUERY, locationId);
    con.query({
      sql: P_QUERY
    }, (err, res) => {
      cb(err, res[0]);
    });
  }

}

export default Location;