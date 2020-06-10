import mysql from 'mysql'

var conn = mysql.createConnection({
  host: '',
  user: '',
  password: '',
  database: '',
  port: 3306
})

conn.connect((err) => {
  if (err) {
    console.log('mysql_error', err)
  } else {
    conn.query('SELECT * FROM test_table', function (err, result, fields) {
      if (err) throw err
      console.log(result)
    })
  }
})
