// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
const cors = require('cors');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
/* Spin up the server*/
const server = app.listen(port, listening);
 function listening(){
    // console.log(server);
    console.log(`running on localhost: ${port}`);
  };

// ROUTES

// empty array to store objects
let projectData = {};

// GET route to return contents of projectData
app.get('/checkWeather', getWeatherData);

  function getWeatherData(req, res) {
      res.send(projectData.toString());
  };


// POST route to add incoming data to projectData
app.post('/addWeather', addWeatherData);
    function addWeatherData(req, res) {
        projectData = req.body.current.temp;
        res.send(projectData.toString());
};