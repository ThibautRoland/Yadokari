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

function findOneDoctor(id, callback) {

    const query = {
        text: "SELECT * FROM doctors WHERE id = ($1);",
        values: [id]
    };

    pool.query(query, (error, results) => {
        if (error) {
            return callback(error, [])
        }

        console.log('from repository:', results.rows)

        return callback(null, results.rows)
    })
}

  module.exports = {
    findAllDoctors,
    findOneDoctor
};

