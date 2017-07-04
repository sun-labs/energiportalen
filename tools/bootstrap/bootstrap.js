import 'source-map-support/register';

import Connection from '../../backend/models/Connection';
import Queries from '../../backend/assets/Queries.js';

let con = new Connection('DEV'); // connect to dev database
con.init((err) => {
  con.FORCE_UNSAFE = false; // change this if you need a reset of the database (delete all data and repopulate).
  con.dropAllTables((err) => {
    if(err) { 
      console.log(err); 
      process.exit();
    }
    con.bootstrapAllTables((err) => {
      if(err) {
        console.log(err);
      } else {
        console.log('fucking done yall.');
      }
      process.exit();
    });
  });
});