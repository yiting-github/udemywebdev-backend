var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose");

mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });

//Schema Setup
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});

// compile to model

var Campground = mongoose.model("Campground", campgroundSchema)
// Campground.create(
// 	{ name: "Yellowstone",
// 	 image: 	"https://www.reserveamerica.com/webphotos/GA/pid530195/sid258569/3/540x360.jpg"
// 	}, function(err, campground){
// 		if(err){
// 			console.log(err);
// 		} else {
// 			console.log("Newly Create Campground:");
// 			console.log(campground);
// 		}
// 	});





app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


	
app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
	// Get all the data from DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds", {campgrounds: allCampgrounds});
		}
	});
});

app.post("/campgrounds", function(req, res){
	// get data from form and add campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	// Create a new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			// redirect back to campgrounds page
			res.redirect("/campgrounds");
		}
	});
	
});

app.get("/campgrounds/new", function(req, res){
	res.render("new");
});


app.listen(3000, function(){
	console.log("The YelpCamp server is running!");
});