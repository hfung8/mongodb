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

var mycollection = db.collection('news')
var news = {
	"Title": "title",
	"Body": "body"
}
db.collections.insert(news);

//Main route simple (Hello World Message)
app.get("/", function(req,res){
	res.send("hello world");
});

//Retrieve data from the db
app.get("/all", function(req,res){
	console.log("In all function");
	db.getCollection('news').find({}, function(error,data){
		if(error){
			console.log(error);
		}
		else{
			console.log(data);
		}
	});
});

//Retrieve scraped material from the NY TIMES website
app.get("/scraped", function(req,res){
	request("https://www.nytimes.com/", function(error,response,html){
		if (error){
			console.log("error");
		}
		else{
			var arr = [];
			var titleArr = [];
			var $ = cheerio.load(html);
			$(".story-heading").each(function(i,element){
			var title = $(element).find('a').text();
			var link = $(element).find('a').first().attr('href');
			// if (link != undefined){
			// 	arr.push(link);
			// 	titleArr.push(title);
			// 	console.log('test');
			// }
			saveTitleAndLink(title,link);
			})	
		}
	})
});

function saveTitleAndLink(title,link){
if (title && link){
		db.collections.save({
			title: title,
			link: link
		})
	}
};


app.listen(3000, function(){
	console.log("App is running on port 3000!");
});

