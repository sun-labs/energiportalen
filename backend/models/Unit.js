import express from 'express';
import mysql from 'mysql';
import config from '../config.js';

let unitRouter = express.Router();

let con = mysql.createConnection(config.mysql);
con.connect((error) => {
  if(!error) {
  console.log('sql connected');
  } else {
  console.log(error);
  }
});

const getUnits = (cb) => {

  const query = `
    SELECT 
      id, name 
    FROM 
      units
  `;

  con.query({
    sql: query,
    timeout: 5000,
  }, function (error, results, fields) {
    if(!error) {
      cb(results, fields);
    } else {
      console.log(error);
    }
  });

};

const getUnitKeys = (unitId, cb) => {

  const query = `
    SELECT DISTINCT 
      ud.unit_key, uk.name 
    FROM unit_data_day as ud
    INNER JOIN unit_keys as uk
    ON ud.unit_key = uk.id
    WHERE ud.unit_id = ?
  `;
  const inserts = [unitId];
  const p_query = mysql.format(query, inserts);

  con.query({
    sql: p_query
  }, (error, results, fields) => {
    if(!error) {
      cb(results, fields);
    } else {
      console.log(error);
    }
  });

};

// id = 4, key = 85
const getUnitDataFromKey = (unitId, unitKeyId, cb) => {

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
  }, (error, results, fields) => {
    if(!error) {
      const data = results.map((item, index) => {
        return item.data;
      });
      const timestamps = results.map((item) => {
        return item.timestamp;
      });

      cb({ data, timestamps });
    } else {
      console.log(error);
    }
  });

};

// get units
unitRouter.get('/', (req, res) => {
  getUnits((results, fields) => {
    res.json(results);
  });
});

// get data keys from a unit
unitRouter.get('/:unitId', (req, res) => {
  getUnitKeys(req.params.unitId, (results, fields) => {
    res.json(results);
  });
});

// get data from a unit with speicified key
unitRouter.get('/:unitId/:unitKeyId', (req, res) => {
  getUnitDataFromKey(req.params.unitId, req.params.unitKeyId, (results, fields) => {
    res.json(results);
  });
});

export default unitRouter;