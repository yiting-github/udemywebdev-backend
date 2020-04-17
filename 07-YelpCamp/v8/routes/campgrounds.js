var express    = require("express");
var router     = express.Router();
var Campground = require("../models/campground");

// INDEX Route - all campgrounds
router.get("/", function(req, res){
	// Get all the data from DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {		
			res.render("campgrounds/index", {campgrounds: allCampgrounds });
		}
	});
});

//CREATE -add new campground to DB
router.post("/", function(req, res){
	// get data from form and add campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.desc;
	var newCampground = {name: name, image: image, description: desc};
	// Create a new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			// redirect back to campgrounds page
			res.redirect("/campgrounds");
		}
	});
	
});

// NEW - a form to create
router.get("/new", function(req, res){
	res.render("campgrounds/new");
});


// SHOW - shows more info about one camground
router.get("/:id", function(req, res){
	// find the campground with ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if (err){
			console.log(err);
		} else {
			console.log(foundCampground);
			// render show template with that campground
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});

})

module.exports = router;