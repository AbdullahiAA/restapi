const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12121212",
  database: "sidehustle",
});

connection.connect((err) => {
  if (err) throw err;

  console.log("Database Connected!");
});

module.exports = connection;
