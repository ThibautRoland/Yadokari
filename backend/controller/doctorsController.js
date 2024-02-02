
const express = require('express');
const doctorLogic = require('../logic/doctors');
const app = express();

app.get('/', async (req, res) => {
  doctorLogic.getAllDoctors((error, doctors) => {
    if (error) {
        res.status(500).json({ error: 'error => '+error });
    } else {
        res.status(200).json(doctors);
    }
});
});

module.exports = app;