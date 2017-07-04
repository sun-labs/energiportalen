import 'source-map-support/register';

import Connection from '../../backend/models/Connection';
import Queries from '../../backend/assets/Queries.js';

let con = new Connection('DEV'); // connect to dev database
con.init((err) => {
  con.dropAllTables((err) => {
    if(err) { return 'shit'; }
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