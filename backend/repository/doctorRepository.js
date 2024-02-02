const Pool = require('pg').Pool

const pool = new Pool({
    user: 'thibaut',
    host: 'localhost',
    database: 'yadokari',
    password: 'password',
    port: 5432,
  })


  function findAllDoctors(callback) {
    pool.query('SELECT * FROM doctors', (error, results) => {
        if (error) {
            console.log("ERROR ", error);
            callback(error, []);
        } else {
            console.log("found ", results.rowCount);
            callback(null, results.rows);
        }
    });
}

  module.exports = {
    findAllDoctors,
};