const express = require('express');
const bodyParser = require('body-parser'); // Middleware for parsing JSON
const Pool = require('pg').Pool

const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(bodyParser.json());



const pool = new Pool({
  user: 'thibaut',
  host: 'localhost',
  database: 'yadokari',
  password: 'password',
  port: 5432,
})

//CONTROLLER.js
app.get('/doctors', (req, res) => {

    pool.query('SELECT * FROM doctors', (error, results) => {
        if (error) {
          res.status(503).json(error)
          return
        }
        res.status(200).json(results.rows)
      })

});


app.get('/doctor/:id', (req, res) => {
    const idString = req.params.id
    const id = parseInt(idString, 10);
    // console.log(typeof idInt);
    // console.log(idInt);
    // console.log(typeof id, id);
    if (!Number.isInteger(id)){
        res.status(400).json("id should be a number")
        return
    }
    const query = {
        text: 'SELECT * FROM doctors WHERE id = ($1)',
        values: [id],
      }

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

});

/*app.post('/doctor/near/{x}/{y}', (req, res) => {

    pool.query('SELECT * FROM doctors', (error, results) => {
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
