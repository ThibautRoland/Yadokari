const db  = require('../repository/doctorRepository')
const historyDb = require('../repository/historyRepository')
const doctorModel = require( '../model/doctorModel')
const historyModel = require('../model/historyModel');

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

function mapHistoryModel(doctorName) {
    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');

    return new historyModel(doctorName, formattedDate);
}

function getOneDoctor(doctorName, callback) {

    // save quoi qu'il arrive
    const historyInstance = mapHistoryModel(doctorName);
    historyDb.save(historyInstance);


    db.findOneDoctor(doctorName, (error, doctorRow) => {
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

function getDoctorsNearby(requestNearbyDoctor, callback) {
    db.findDoctorsNearby( requestNearbyDoctor, (error, doctorsNearbyRows) => {
        if (error) {
            console.error("error getting the doctors nearby:", error);
            return callback(error, []);
        }

        const doctorsNearby = doctorsNearbyRows.map((row) => mapNearbyDoctors(row))
        // console.log("doctorsNearby from logic ", doctorsNearby);
        return callback(null, doctorsNearby);
    })
}

function requestLogicHistory(callback) {
    historyDb.historyRequest((error, historyResult) => {
        return callback(null, historyResult);
    })
}

function saveDoctor(doctor, callback){
    db.saveDoctor(doctor, (error, insertResult)=>{

        if (error) {
            console.log("[ERROR] : error saving in doctor with " + doctor + " with error => " + err);
            return callback(error, []);
        }

        console.log("Successfully inserted new doctor " + doctor);

        if (insertResult.length !=1  ){
            const errorLength = "should had one id returned from saving bug got"+ insertResult.length
            return callback(errorLength, null);
         }

        // TOUT VA BIEN
        return callback(null, insertResult[0].id);
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

function mapNearbyDoctors(row) {
    const doctor = new doctorModel();
    doctor.name = row.name;
    doctor.age = row.age;
    doctor.x = row.x;
    doctor.y = row.y;
    doctor.speciality = row.speciality
    return doctor
}

module.exports = {
    getAllDoctors,
    getOneDoctor,
    getDoctorsNearby,
    requestLogicHistory,
    saveDoctor
};