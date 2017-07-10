import 'source-map-support/register';

import Connection from '../../backend/models/Connection';
import Queries from '../../backend/assets/Queries.js';

/**
 * Wont remove or alter SENSITIVE_TABLES.
 */
const SENSITIVE_TABLES = ["unit_data"];
const TABLES = Queries.TABLES.filter((table) => {
  return SENSITIVE_TABLES.indexOf(table) === -1;
});

let con = new Connection('DEV'); // connect to dev database
con.init((err) => {
  con.FORCE_UNSAFE = false; // activate fatal functions if true
  con.dropTables(TABLES, (err) => {
    if(err) { 
      if(err.unsafe === true) {
        console.log('[INFO] Wont drop tables as the environment is unsafe.');
      } else {
        console.log(err);
        process.exit();
      }
    }
    con.bootstrapTables(TABLES, (err) => {
      if(err) {
        console.log(err);
      } else {
        console.log(`[INFO] Added and populated ${TABLES.length} tables to ${con.database}.`);
      }
      process.exit();
    });
  });
});