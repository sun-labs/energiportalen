import Connection from '../../backend/models/Connection';

let con = new Connection('DEV'); // connect to dev database
con.init((err) => {
  con.createAllTables((err) => {
    console.log('created tables');
    con.populateAllTables((err) => {
      console.log('populated tables');
      process.exit();
    });
  });
});