// server.js
// SERVER-SIDE JAVASCRIPT

/////////////////////////////
//  SETUP and CONFIGURATION
/////////////////////////////

//require express in our app
var express = require("express"),
  bodyParser = require("body-parser");

// generate a new express app and call it 'app'
var app = express();

//import models module
const db = require("./models");

// serve static files in public
app.use(express.static("public"));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

////////////////////
//  ROUTES
///////////////////

// define a root route: localhost:3000/
app.get("/", (req, res) => {
  res.sendFile("views/index.html", { root: __dirname });
});

