//Dependencies
var express = require("express");
var mongojs = require("mongojs");

//Request packages that allow us to scrape the website
var request = require("request");
var cheerio = require("cheerio");

//Initialize Express
var app = express();

//Database configuration 
var databaseURL = "scraper";
var collections = ["scrapedData"];

//Display materials in folder public on load
app.use(express.static(__dirname + '/public'));

//Database configuration with mongo
var db = mongojs(databaseURL, collections);
db.on("error", function(error){
	console.log("Database Error:", error);
});

//Main route simple (Hello World Message)
app.get("/", function(req,res){
	res.send("hello world");
});

// Retrieve data from the db
app.get("/all", function(req,res){
	db.collections.find({}, function(err,found){
		if(err){
			console.log(err);
		}
		else{
			res.json(found);
		}
	});
});
		
app.get("/scraped", function(req,res){
	request("https://www.nytimes.com/", function(error,response,html){
		if (error){
			console.log("error");
		}
		else{
			var arr = [];
			var $ = cheerio.load(html);
			$(".story-heading").each(function(i,element){
			var link = $(element).find('a').first().attr('href');
			if (link != undefined){
		arr.push(link);
			}
		})
		for (var i = 0; i < 10; i++){
			console.log(arr[i]);
		}
	}
	})
})
var news = {
	"Title": "title",
	"Body": "body"
}
db.collections.insert(news
	);




app.listen(3000, function(){
	console.log("App is running on port 3000!");
});

