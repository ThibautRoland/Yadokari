const mysql = require('mysql')
require('dotenv').config()

const db = initConnection();

// const pool = mysql.createPool({
//     connectionLimit: 10,
//     host: 'localhost',
//     user: 'thibaut',
//     password: 'password',
//     database: 'history'
//   });
  
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

function historyRequest(callback) {
    // const query = "SELECT * FROM history;"

    // db.query(query, (error, results) => {
    //     if (error) {
    //         console.log("ERROR ", error);
    //         callback(error, []);
    //     } else {
    //         console.log("found ", results);
    //         callback(null, results);
    //     }
    // });

    db.query('SELECT * FROM history', (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          return callback(err, []);
        } else {
          console.log('Query results:', results);
          return callback(null, results);
        }
    });   
}

function save(historyModel) {

   /* const query = {
      text: "INSERT INTO history (v) VALUES (?,?) ;",
      values: [historyModel.doctorName, historyModel.dateSearched]
    }*/

    const query = "INSERT INTO history (doctorName, dateSearched) VALUES ('"+historyModel.doctorName+"', '"+historyModel.dateSearched+"')";

//connection.query(sql, [name , email, address, city, country , password]

    console.log(query)

    db.query(query, (err, results) => {
        if (err) {
          console.log("[ERROR] : error saving in history with "+historyModel + " with error => "+err)
        } else {
          console.log("successfully inserted in history for doctorName "+historyModel.doctorName+" at date "+historyModel.dateSearched)
        }
    })
  }

function initConnection() {
    const user = process.env.MYSQL_USER || "thibaut"
    const host = process.env.MYSQL_HOST || "localhost"
    const database=  process.env.MYSQL_DB || "history"
    const password= process.env.MYSQL_PWD || "password"
    const port= process.env.MYSQL_PORT || 3306

    return mysql.createConnection({
        user     : user,
        host     : host,
        database: database,
        password : password,
        port: port,
        insecureAuth: true
      });
}

module.exports = {
    historyRequest,
    save
}