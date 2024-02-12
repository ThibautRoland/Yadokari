const Pool = require('pg').Pool
require('dotenv').config()

const pool = initPool()

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

function findOneDoctor(name, callback) {

    const query = {
        text: "SELECT * FROM doctors WHERE name = ($1) LIMIT 1;",
        values: [name]
    };

    pool.query(query, (error, results) => {
        if (error) {
            return callback(error, [])
        }

        console.log('from repository:', results.rows)

        return callback(null, results.rows)
    })
}

function findDoctorsNearby(requestNearbyDoctor , callback) {

    const query = {
        text: " SELECT d.name, d.age, d.x, d.y, s.name AS speciality FROM doctors d LEFT JOIN speciality s ON d.speciality_key = s.speciality_key WHERE 6371 * 2 * ASIN( SQRT(POWER(SIN(RADIANS(d.y - ($1)) / 2), 2) + COS(RADIANS($1)) * COS(RADIANS(d.y)) *POWER(SIN(RADIANS(d.x - ($2)) / 2), 2))) <= ($3) AND s.name = ($4);",
        values: [requestNearbyDoctor.lat,
            requestNearbyDoctor.long,
            requestNearbyDoctor.distance,
            requestNearbyDoctor.speciality]
    }

    console.log("callback : " ,callback);
    console.log("speciality : " ,requestNearbyDoctor.speciality);

    pool.query(query, (error, results) => {
        if (error) {
            return callback(error, [])
        }
        console.log('result from pool.query:', results.rows);
        return callback(null, results.rows);
    })

}

function saveDoctor(doctor, callback) {
    const query = 'INSERT INTO doctors (name, age, x, y, speciality_key) VALUES ($1, $2, $3, $4, $5) RETURNING id';
    const values = [doctor.name, doctor.age, doctor.x, doctor.y, doctor.specialityKey];

    pool.query(query, values, (err, results) => {
        if (err) {
            return callback(err, null);
        }

        return callback(null, results.rows);
        
    });
}

function patchDoctor(updatedFields, callback){

    const fieldNames = Object.keys(updatedFields);
    const fieldValues = fieldNames.map(fieldName => updatedFields[fieldName]);

    // Create the SET part of the SQL query
    const setClause = fieldNames.map((fieldName, index) => `${fieldName} = $${index + 1}`).join(', ');

    // Build the SQL query
    const query = `UPDATE doctors SET ${setClause} WHERE id = $${fieldValues.length + 1} RETURNING id`;
    const values = [...fieldValues, doctorId];

    // Execute the query
    pool.query(query, values, (err, results) => {
        if (err) {
            return callback(err, null);
        }

        // Check if any rows were affected
        if (results.rowCount === 0) {
            return callback(new Error('Doctor not found'), null);
        }

        return callback(null, results.rows[0].id);
    });
}

function initPool(){
    const user = process.env.POSTGRES_USER || "thibaut"
    const host = process.env.POSTGRES_HOST || "localhost"
    const database=  process.env.POSTGRES_DB || "yadokari"
    const password= process.env.POSTGRES_PWD || "password"
    const port= process.env.POSTGRES_PORT || 5432

    return new Pool({
        user: user ,
        host: host,
        database: database,
        password: password,
        port: port,
    })
}


  module.exports = {
    findAllDoctors,
    findOneDoctor,
    findDoctorsNearby,
    saveDoctor
};

