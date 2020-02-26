var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose");

mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });

//Schema Setup
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

// compile to model

var Campground = mongoose.model("Campground", campgroundSchema)

// Campground.create(
// 	{ name: "Joshua tree",
// 	 image: "https://www.reserveamerica.com/webphotos/racms/articles/images/635a0b9d-a566-46cb-acf7-c942b889efea_image2_goblin-valley-state-park-yurts.jpg",
// 	 description: "Winter is the busy season for camping at this southern park. Enjoy the beauty of the Joshua trees without the sweltering heat."
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


// INDEX Route - all campgrounds
app.get("/campgrounds", function(req, res){
	// Get all the data from DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {		
			res.render("index", {campgrounds: allCampgrounds});
		}
	});
});

//CREATE -add new campground to DB
app.post("/campgrounds", function(req, res){
	// get data from form and add campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.desc;
	var newCampground = {name: name, image: image, description: desc};
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

// NEW - a form to create
app.get("/campgrounds/new", function(req, res){
	res.render("new");
});


// SHOW - shows more info about one camground
app.get("/campgrounds/:id", function(req, res){
	// find the campground with ID
	Campground.findById(req.params.id, function(err, foundCampground){
		if (err){
			console.log(err);
		} else {
			// render show template with that campground
			res.render("show", {campground: foundCampground});
		}
	});
	
})

app.listen(3000, function(){
	console.log("The YelpCamp server is running!");
});