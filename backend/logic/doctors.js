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
            // mappinp         
            const doctors = allDoctorRows.map((row => mapDoctorEntityToModel(row)))
            console.log("first from logic ", doctors[0]);       
            callback(null, doctors);
        }
    });
}

function getOneDoctor(id, callback) {
    db.findOneDoctor(id, (error, doctorRow) => {
        if (error) {
            console.error("Error getting this doctor:", error);
           return callback(error, {});
        }

        // no results
        if (doctorRow.length <1){
           return callback(null, null);
        }

        // more than one doctor found
        if (doctorRow.length >1){
           return callback("no more than one doctor should be found", null);
        }

        const doctor = mapDoctorEntityToModel(doctorRow[0]);
        return callback(null, doctor);
    })
}

function getDoctorsNearby(distance, long, lat, callback) {
    db.findDoctorsNearby(distance, long, lat, (error, doctorsNearbyRows) => {
        if (error) {
            console.error("error getting the doctors nearby:", error);
            return callback(error, []);
        }

        // no results
        if (doctorsNearbyRows.length < 1) {
            return callback(null, []);
        }

        const doctorsNearby = doctorsNearbyRows.map((row) => mapDoctorEntityToModel(row))
        console.log("first from logic ", doctorsNearby[0]);
        return callback(null, doctorsNearby);
    })
}

function mapDoctorEntityToModel(row){
    const doctor = new doctorModel();
    doctor.id = row.id;
    doctor.name = row.name;
    doctor.age = row.age;
    doctor.x = row.x;
    doctor.y = row.y;
    doctor.speciality =  row.speciality_key;
    return doctor
}

module.exports = {
    getAllDoctors,
    getOneDoctor,
    getDoctorsNearby
};