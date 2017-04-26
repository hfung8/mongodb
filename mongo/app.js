var express = require("express");
var mongoose = require("mongoose");
var Article = require("./models/Article.js");
module.exports = function(app){
var Schema = mongoose.Schema;

var newsSchema = new Schema({
  // title is a required string
  title: {
    type: String,
    required: true
  },
  // link is a required string
  link: {
    type: String,
    required: true
  },
  // This only saves one note's ObjectId, ref refers to the Note model
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

var News = mongoose.model('News', newsSchema);

app.get("/all", function(req,res){
	console.log("In all function");
	Article.find().limit(10).exec(function(error,data){
		if(error){
			console.log(error);
		}
		else{
			console.log(data);
		}
		res.send(data);
	});
});
	
// News.create(data, function(err,small){
// 	if (err) return handleError(err);
// });

// app.get("/scraped", function(req,res){
// 	request("http://www.nytimes.com/", function(error,response,html){
// 		var $ = cheerio.load(html);
// 		$(".story-heading").each(function(i,element){
// 			var result = {};

// 			result.title = $(this).children("a").text();
// 			result.link = $(this).children("a").attr("href");

// 			var entry = new Article(result);

// 			entry.save(function(err,doc){
// 				if (err) {
// 					console.log(err);
// 				}
// 				else{
// 					console.log(doc);
// 				}
// 				})

// 			})
// 		})
// 	});

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
		Article.insertMany({
			title: title,
			link: link
		})
	}
};

app.get("/savedArticles", function(req,res){
	Article.find({saved:true}).exec(function(error,data){
		if(error){
			console.log(error);
		}
		else{
			console.log(data);
		}
		res.send(data);
	});
});

app.post("/postOneArticle", function(req,res){
	var id = req.body.id;
	console.log(req.body);
	Article.findByIdAndUpdate(id, {saved:true}).exec(function(error,data){
		if(error){
			console.log(error);
		}
		else{
			console.log(data);
		}
		res.send(data);
	});
});
}