const express = require('express');
const doctorLogic = require('../logic/doctors');
const app = express();
const requestNearbyDoctor = require( '../model/request/RequestNearbyDoctor')

// doctors/
app.get('/', async (req, res) => {
  doctorLogic.getAllDoctors((error, doctors) => {
    if (error) {
        return res.status(500).json({ error: 'error => '+error });
    }

    return res.status(200).json(doctors);
  });
});

// testing history request
app.get("/history", async (req, res) => {
    doctorLogic.requestLogicHistory((error, result) => {
        if (error) {
            return res.status(500).json({ error: 'error => '+error });
        }
    
        return res.status(200).json(result);
    })
})

//doctors/:id
app.get('/:name', async (req, res) => {
    const name = req.params.name
    
    if (name == '') {
        return res.status(422).json("name should have a value")
    }

    doctorLogic.getOneDoctor(name, (error, doctor) => {
        if (error) {
            return res.status(500).json({ error: 'error => '+error });
        }

        if (doctor === null) {
          return res.status(404).json({ "message": 'no doctor found with name '+ name });
        }

        console.log("from controller ",doctor)
    
        return res.status(200).json(doctor);
    })

    
});

//doctors/:distance/:long/:lat
app.get("/:distance/:long/:lat/:speciality", async (req, res) => {
    const long = req.params.long;
    const lat = req.params.lat;
    const distance = req.params.distance;
    const speciality = req.params.speciality;

    const req = new requestNearbyDoctor(lat,long,distance,speciality)

    doctorLogic.getDoctorsNearby(req, (error, doctorsNearby) => {
        if (error) {
            return res.status(500).json({ error: 'error => '+error });
        }

        if (doctorsNearby.length < 1) {
            return res.status(404).json({ "message": 'no doctors found around you'});
        }

        return res.status(200).json(doctorsNearby);
    })
})


module.exports = app;