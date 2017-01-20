// Dependencies
// **************************************
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// Sets up the Express App
// *************************************
var app = express();
var PORT = process.env.PORT || 3000;
// uses any static files required by the html files.
app.use(express.static('app/public/'));
// Sets up the Express app to handle data parsing 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// ***********************************
// ROUTER  exporting functions
// The below points our server to "route" files within the directory.
// ***********************************
//var apiRoutes = require("./app/routing/apiRoutes");
//apiRoutesFn(app);
require('./app/routing/apiRoutes.js')(app);
require('./app/routing/htmlRoutes.js')(app); 


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// Starts the server 
// ************************************
app.listen(PORT, function() {
	console.log('App listening on PORT ' + PORT);
});

