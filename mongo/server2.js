var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var request = require('request');
var cheerio = require('cheerio');

mongoose.Promise = Promise; 


var app = express();

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: true }));
 
// parse application/json 
app.use(bodyParser.json({ type: 'application/**json'}));

app.use(bodyParser.raw({type: 'application/vnd.custom-type'}));

app.use(bodyParser.text({type: 'text/html'}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/scraper");
var db = mongoose.connection;

db.on("error", function(error){
	console.log("Mongoose Error: ", error);
});

db.once("open", function(){
	console.log("Mongoose connection successful.");
});

require("./app.js")(app);

app.listen(3000, function() {
  console.log("App running on port 3000!");
});

