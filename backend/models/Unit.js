import mysql from 'mysql';
import Connection, { con } from './Connection';

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

  /**
   * options: {
   *  date: { 
   *    from : Date, 
   *    to : Date
   *  },
   *  interval : String {
   *    'raw' | 'min' | 'hour' | 'day'
   *  }
   * }
   * CB: err, {data}
   */
  // REAL DATA: id = 4, key = 85
  static getUnitDataFromKeyDate(unitId, unitKeyId, {
    date = {},
    interval = 'day'
  }, cb) {

    const {
      from = '1972-01-01',
      to = new Date()
    } = date;

    const fromObj = new Date(from);
    const toObj = new Date(to);
    if(fromObj > toObj) {
      return cb(new Error('From cant be later than To'), undefined);
    }

    const INTERVAL = Connection.getIntervalFormat(interval);

    const QUERY = `
      SELECT 
        u.unit_id,
        u.unit_key,
        (SELECT name FROM units WHERE id = unit_id) as unit_name,
        (SELECT name FROM unit_keys WHERE id = unit_key) as unit_key,
        AVG(value) as avg_val,
        u.new_timestamp
      FROM (
        SELECT
          unit_id,
          unit_key,
          DATE_FORMAT(timestamp, '${INTERVAL}') as new_timestamp,
          value
        FROM
          unit_data
        WHERE
          (unit_id = ? AND unit_key = ?) AND
          (timestamp >= ? AND timestamp <= ?)
      ) as u
      GROUP BY 
        new_timestamp, 
        unit_key, 
        unit_id
      ORDER BY new_timestamp
    `;

    const INSERTS = [unitId, unitKeyId, from, to];
    const P_QUERY = mysql.format(QUERY, INSERTS);

    con.query({
      sql: P_QUERY
    }, (err, res) => {
      cb(err, res);
    });

  }

  static formatData(data) {
    const values = data.map((item) => {
      return item.value;
    });
    const timestamps = data.map((item) => {
      return item.timestamp;
    });
    return { 
      values, 
      timestamps 
    };
  }

}

export default Unit;