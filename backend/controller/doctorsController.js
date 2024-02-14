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

app.get("/:distance/:long/:lat/:speciality", async (req, res) => {
    const long = req.params.long;
    const lat = req.params.lat;
    const distance = req.params.distance;
    const speciality = req.params.speciality;

    const requestInput = new requestNearbyDoctor(lat,long,distance,speciality)

    doctorLogic.getDoctorsNearby(requestInput, (error, doctorsNearby) => {
        if (error) {
            return res.status(500).json({ error: 'error => '+error });
        }

        if (doctorsNearby.length < 1) {
            return res.status(404).json({ "message": 'no doctors found around you'});
        }

        return res.status(200).json(doctorsNearby);
    })
})

app.post("/", async (req, res) => {
    const doctor = req.body;

    if (doctor.name == null || doctor.age == null || doctor.x == null || doctor.y == null || doctor.specialityKey == null) {
        return res.status(422).json("There shouldn't be a blank value")
    }

    doctorLogic.saveDoctor(doctor, (error, id) => {
        if (error) {
            return res.status(500).json({ error: 'error => '+error });
        }

        return res.status(201).json({ id: id });
    })

})

app.put("/:id", async (req, res) => {

    const id = req.params.id;
    const reqBody = req.body;

    if (reqBody.name == null || reqBody.age == null || reqBody.x == null || reqBody.y == null || reqBody.speciality == null) {
        return res.status(422).json("There shouldn't be a blank value")
    }

    doctorLogic.putDoctor(reqBody, id, (error, doctorPut) => {
        return res.status(201).json(doctorPut)
    })
})

//patch is currently useless for our use-case
/*app.patch("/:id", async (req, res) => {

    const id = req.params.id;

    const toPatch = req.body;

    if (toPatch.name == null && toPatch.age == null && toPatch.x == null && toPatch.y == null && toPatch.speciality == null) {
        return res.status(422).json("should patch at least one field")
    }

    doctorLogic.patchDoctor(toPatch, id, (error, doctorPatched) => {
        if (error) {
            return res.status(500).json({ error: 'error => '+error });
        }

        return res.status(200).json(doctorPatched);
    })
})*/

app.delete("/:id", async (req, res) => {

    const id = req.params.id;

    doctorLogic.deleteDoctor(id, (error) => {

        if (error) {
            return res.status(500).json({ error: 'error => '+error });
        }

        return res.status(204).json()
    })
})

module.exports = app;