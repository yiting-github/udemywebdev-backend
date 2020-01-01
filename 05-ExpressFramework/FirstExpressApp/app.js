var express = require("express"); //import express
var app = express();

// "/" => "Hi There!"
app.get("/", function(req, res){
	res.send("Hi there!");
})
// "/bye" => "Goodbye!"
app.get("/bye", function(req, res){
	res.send("Goodbye!");
})

// "/dog" => "MEOW!"
app.get("/dog", function(req, res){
	console.log("someone makes a request to /dog!!");
	res.send("MEOW!");
})


// Tell Express to listen for requests (start server)
app.listen(3000, function() { 
  console.log('Server listening on port 3000'); 
});