const mysql = require('mysql2');

const dbconnection = mysql.createConnection({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  ssl: {
    rejectUnauthorized: false
  }
});

dbconnection.connect((err) => {
  if (err) {
    console.log("Connection failed:", err);
  } else {
    console.log("MySQL Connected!");
  }
});

module.exports = dbconnection;