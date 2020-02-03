var express = require("express");
var app = express();
app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
	var campgrounds =[
	{name: "Joshua tree", image: "https://pixabay.com/get/57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c7d2f7dd29e45c25a_340.jpg"},
	{name: "Yellowstone", image: "https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c7d2f7dd29e45c25a_340.jpg"},	
	{name: "Petrified Forest", image: "https://pixabay.com/get/52e5d7414355ac14f6da8c7dda793f7f1636dfe2564c704c7d2f7dd29e45c25a_340.jpg"}	
	]
	
	res.render("campgrounds", {campgrounds: campgrounds});
});

app.listen(3000, function(){
	console.log("The YelpCamp server is running!");
});