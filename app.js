// We are going to use express and body parser so here we import their
var express = require('express'); 
var bodyParser = require('body-parser'); 
var routes = require('./routes'); 

var app = express();  

app.listen(3000, function() {     //The application is going to be listen in the port 3000
	console.log("Listening in the port 3000");
});
app.use(bodyParser.json());
app.use('/', routes); 