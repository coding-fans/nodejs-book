const mysql = require('mysql')

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'to0r'
})

con.connect(async function(err) {
  if (err) {
    return console.log(err)
  }

  console.log('connect success')

  con.query('CREATE DATABASE user', function(err, result) {
    if (err) {
      return console.log('create database err', err)
    }

    console.log('create database user', result)
  })

})
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'to0r'
})

connection.connect()
