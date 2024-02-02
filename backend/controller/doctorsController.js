
const express = require('express');
const doctorLogic = require('../logic/doctors');
const app = express();

app.get('/test',  (req, res) => {
  
res.status(200).json("ça marche");
 
});

app.get('/', async (req, res) => {
  doctorLogic.getAllDoctors((error, doctors) => {
    if (error) {
        return res.status(500).json({ error: 'error => '+error });
    }

    return res.status(200).json(doctors);
  });
});

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

module.exports = app;