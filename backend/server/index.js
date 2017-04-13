var mysql = require('mysql');
var express = require('express');
var app = express();

var dbConnection = {
  host: 'localhost',
  port: '8889',
  user: 'kasper',
  password: '***REMOVED***',
  database: 'kasper'
}

var connection = mysql.createConnection(dbConnection);

connection.connect(function(){
  console.log("Connected to database: " + dbConnection.database);
});

// TEST QUERY
connection.query({
  sql: 'SELECT * FROM `unit_keys`',
  timeout: 40000, // 40s
}, function (error, results, fields) {

  if (error) {
    console.log(error);
  } else {
    console.log(results);
    // console.log(fields);
  }
});

app.set('port', (process.env.PORT || 8080));

app.listen(app.get('port'), function(){
  console.log('App running on port 8080');
});