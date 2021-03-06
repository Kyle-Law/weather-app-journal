// Setup empty JS object to act as endpoint for all routes
// projectData = [];
projectData = {};
entry = 0;

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Cors for cross origin allowance
const cors = require('cors')
app.use(cors())

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = process.env.PORT || 3000;

// Spin up the server
const server = app.listen(port, listening);

// Callback to debug
function listening(){
    console.log("server running"); 
    console.log(`running on localhost: ${port}`);
}

// Execution

// app.get('/', getData)



app.post('/addJournal',addJournal);
function addJournal(req,res) {
    newEntry = {
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content,
        icon: req.body.icon,
        country:req.body.country
    }
    // projectData.unshift(newEntry)
    projectData[entry] = newEntry;
    entry += 1
    // Object.assign(projectData, newEntry);
    res.send(projectData);
    console.log(projectData);
};

app.get('/all', getData)
function getData(req, res) {
    res.send(projectData);
};