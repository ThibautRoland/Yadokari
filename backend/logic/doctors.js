const db  = require('../repository/doctorRepository')
const doctorModel = require( '../model/doctorModel')

// The logic file acts as a bridge between the data access layer (repository)
// and the higher-level application logic.

function getAllDoctors(callback) {
    db.findAllDoctors((error, allDoctorRows) => {
        if (error) {
            console.error("Error getting all doctors:", error);
            callback(error, []);
        } else {
            // mapping
            const doctors = allDoctorRows.map((row) => new doctorModel(row));
            callback(null, doctors);
        }
    });
}

module.exports = {
    getAllDoctors,
};