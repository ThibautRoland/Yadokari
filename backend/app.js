const express = require('express');
const bodyParser = require('body-parser'); // Middleware for parsing JSON
const doctorsController = require('./controller/doctorsController');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(bodyParser.json());

// Enable CORS for all routes, must be disabled for production
app.use(cors());


app.use('/doctors', doctorsController);

/*app.get('/doctor/:id', (req, res) => {
    const idString = req.params.id
    const id = parseInt(idString, 10);
    if (!Number.isInteger(id)){
        res.status(400).json("id should be a number")
        return
    }
    const query = {
        text: 'SELECT * FROM doctors WHERE id = ($1)',
        values: [id],
      }

    console.log(query.values);

    pool.query(query, (error, results) => {
        if (error) {
            res.status(500).json(error)
            return
        }

        if (results.rows === null) {
            res.status(404).json("no doctors")
            return
        }
        res.status(200).json(results.rows)
      })

});*/

/*app.get('/doctors/:distance/:long/:lat', (req, res) => {

    const long = req.params.long;
    const lat = req.params.lat;
    const distance = req.params.distance

    const query = {
        text: 'SELECT * FROM doctors WHERE 6371 * 2 * ASIN( SQRT(POWER(SIN(RADIANS(doctors.y - ($1)) / 2), 2) + COS(RADIANS($1)) * COS(RADIANS(doctors.y)) *POWER(SIN(RADIANS(doctors.x - ($2)) / 2), 2))) <= ($3);',
        values: [lat, long, distance]
    }

    console.log(query.values)

    pool.query(query, (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json(results.rows)
      })

});*/




// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});