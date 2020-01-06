var express = require("express"); //import express
var app = express();


// "/" => "Hi There!"
app.get("/", function(req, res){
	res.send("Hi there!");
});

// "/bye" => "Goodbye!"
app.get("/bye", function(req, res){
	res.send("Goodbye!");
});

// "/dog" => "MEOW!"
app.get("/dog", function(req, res){
	console.log("someone makes a request to /dog!!");
	res.send("MEOW!");
});

// route parameters - add :
app.get("/r/:subredditName", function(req, res){
	var subreddit = req.params.subredditName;
	res.send("WELCOME TO " + subreddit.toUpperCase() + " SUBREDDIT!!");
});

// route parameters
app.get("/r/:subredditName/comments/:id/:title", function(req, res){
	console.log(req.params);
	res.send("Welcome to comments page!!")
});
// except I defined routes
app.get("*", function(req, res){
	res.send("you are a star!!");
});




// Tell Express to listen for requests (start server)
app.listen(3000, function() { 
  console.log('Server listening on port 3000'); 
});