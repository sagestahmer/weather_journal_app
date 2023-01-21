/* Global Variables */
// Create a new date instance dynamically with JS
let d = new Date();
let month = d.getMonth() + 1
let newDate = month+'.'+ d.getDate()+'.'+ d.getFullYear();

const myKey = 'b1d3ad5c7ee8bd8fdc961532dfa40861';
myUnits = 'imperial';
const weatherUrlBase = 'https://api.openweathermap.org/data/3.0/onecall';
const weatherUrlLat = '?lat='
const weatherUrlLon = '&lon='
const weatherUrlUnits = '&units='
const weatherUrlKey =  '&appid='

const geocodeUrlBase = 'http://api.openweathermap.org/geo/1.0/zip?zip=';

// POST request
const postWeather = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const theTemp = await response.json();
        return theTemp;
    } catch(error) {
        console.log("error", error);
    }
};

// GET request to open weather API to convert zip to lat lon
const getLatLon = async (url, zip, country, urlKey, key) => {
    const res = await fetch(url + zip + ',' + country + urlKey + key);
    try {
        const latAndLon = await res.json();
        return(latAndLon);
    } catch(error) {
        console.log("error", error);
    }
};

// GET request to open weather API
const getPublicWeather = async (url, urlLat, lat, urlLon, lon, urlUnits, units, urlKey, key) => {
    const res = await fetch(url + urlLat + lat + urlLon + lon + urlUnits + units + urlKey + key);
    try {
        const theWeather = await res.json();
        return(theWeather);
    } catch(error) {
        console.log("error", error);
    }
};

// function to show results to the User
const updateUI = async (url, temp, userInput) => {
    const res = await fetch(url);
    try {
        const myTemp = await res.json();
        document.getElementById('date').innerHTML = 'Date: ' + newDate;
        document.getElementById('temp').innerHTML = 'Temperature (Fahrenheit): ' + temp;
        document.getElementById('content').innerHTML = 'Feelings: ' + userInput;
    } catch(error) {
        console.log("error", error);
    }
};

// convert zip and country code to coordinates then pass to public weather API to get weather data, then update UI
function chainRequests(e) {
    // get input values
    const zip = document.getElementById('zip').value;
    const country = document.getElementById('country').value;
    const feelings = document.getElementById('feelings').value;

    // perform Get request to geocode API
    getLatLon(geocodeUrlBase, zip, country, weatherUrlKey, myKey)
    // pass in lat&lon object to next request
    .then(function(latAndLon) {
        getPublicWeather(weatherUrlBase, weatherUrlLat, latAndLon.lat, weatherUrlLon, latAndLon.lon, weatherUrlUnits, myUnits, weatherUrlKey, myKey)
        // pass in returned weather object to POST request
        .then(function(theWeather) {
            postWeather('/addWeather', theWeather)
            // get the posted data and display it to user
            .then(function(theTemp) {
                updateUI('/checkWeather', theTemp, feelings)
            })
        })
    })
}

const generateButton = document.getElementById('generate');
generateButton.addEventListener('click', chainRequests);

