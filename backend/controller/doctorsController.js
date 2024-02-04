
const express = require('express');
const doctorLogic = require('../logic/doctors');
const app = express();
const requestNearbyDoctor = require( '../model/request/RequestNearbyDoctor')

app.get('/test',  (req, res) => {
  
return res.status(200).json("ça marche");
 
});

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
    doctorLogic.saveDoctorToHistory((error, result) => {
        if (error) {
            return res.status(500).json({ error: 'error => '+error });
        }
    
        return res.status(200).json(result);
    })
})

//doctors/:id
app.get('/:id', async (req, res) => {
    const idString = req.params.id
    const id = parseInt(idString, 10);
    if (!Number.isInteger(id)) {
        return res.status(422).json("id should be a number")
    }

    doctorLogic.getOneDoctor(id, (error, doctor) => {
        if (error) {
            return res.status(500).json({ error: 'error => '+error });
        }

        if (doctor === null) {
          return res.status(404).json({ "message": 'no doctor found with id '+id });
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

    const reqqqqq = new requestNearbyDoctor(lat,long,distance,speciality)

    doctorLogic.getDoctorsNearby(reqqqqq, (error, doctorsNearby) => {
        if (error) {
            return res.status(500).json({ error: 'error => '+error });
        }

        if (doctorsNearby.length < 1) {
            return res.status(404).json({ "message": 'no doctors found with id '+id });
        }

        return res.status(200).json(doctorsNearby);
    })
})


module.exports = app;