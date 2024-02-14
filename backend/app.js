const express = require('express');
const bodyParser = require('body-parser');
const doctorsController = require('./controller/doctorsController');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(bodyParser.json());

// Enable CORS for all routes, must be disabled for production
app.use(cors());

app.use('/doctors', doctorsController);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});