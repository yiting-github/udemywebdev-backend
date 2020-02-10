var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds =[
{name: "Joshua tree", image: "https://www.reserveamerica.com/webphotos/racms/articles/images/635a0b9d-a566-46cb-acf7-c942b889efea_image2_goblin-valley-state-park-yurts.jpg"},
{name: "Yellowstone", image: "https://www.reserveamerica.com/webphotos/GA/pid530195/sid258569/3/540x360.jpg"},	
{name: "Petrified Forest", image: "https://www.reserveamerica.com/webphotos/CO/pid50035/sid1774/0/540x360.jpg"}	
];
	
app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
	res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
	// get data from form and add campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	campgrounds.push(newCampground);
	// redirect back to campgrounds page
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
	res.render("new");
});


app.listen(3000, function(){
	console.log("The YelpCamp server is running!");
});