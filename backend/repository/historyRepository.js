const mysql = require('mysql')

const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'thibaut',
    password : 'password',
    database: 'history',
    port: 3306,
    insecureAuth: true
  });

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

module.exports = {
    historyRequest,
    save
}