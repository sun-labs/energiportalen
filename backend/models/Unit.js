import mysql from 'mysql';
import { con } from './Connection';

class Unit {

  static getUnits(cb) {
    const query = `
      SELECT 
        id, name 
      FROM 
        units
    `;

    con.query({
      sql: query,
      timeout: 5000,
    }, function (err, units) {
      cb(err, units);
    });
  }

  /**
   * CB: err, [unit]
   */
  static getUnitsFromLocation(locationId, cb) {
    const query = `
      SELECT u.*
      FROM units as u
      INNER JOIN unit_locations as ul ON u.id = ul.unit_id
      INNER JOIN locations as l ON l.id = ul.location_id
      WHERE l.id = ${locationId}
    `;
    const p_query = mysql.format(query, locationId);
    con.query({
      sql: query
    }, (err, units) => {
      cb(err, units);
    });
  };

  static getUnitKeys(unitId, cb) {

    const query = `
      SELECT DISTINCT 
        ud.unit_key, uk.name 
      FROM unit_data_day as ud
      INNER JOIN unit_keys as uk
      ON ud.unit_key = uk.id
      WHERE ud.unit_id = ?
    `;
    const p_query = mysql.format(query, unitId);
    con.query({
      sql: p_query
    }, (err, keys) => {
        cb(err, keys);
    });

  };

  // id = 4, key = 85
  static getUnitDataFromKey(unitId, unitKeyId, cb) {

    const query = `
      SELECT 
        value_avg as data, timestamp
      FROM 
        unit_data_hour as udh
      WHERE 
        udh.unit_id = ? AND 
        udh.unit_key = ?
      ORDER BY udh.timestamp
      LIMIT 24;
    `;
    const inserts = [unitId, unitKeyId];
    const p_query = mysql.format(query, inserts);

    con.query({
      sql: p_query
    }, (err, res) => {
      if (!err) {
        const data = res.map((item, index) => {
          return item.data;
        });
        const timestamps = res.map((item) => {
          return item.timestamp;
        });

        cb(err, { data, timestamps });
      }
    });

  };

}

export default Unit;