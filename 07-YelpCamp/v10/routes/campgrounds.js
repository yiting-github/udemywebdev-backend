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
router.post("/",isLoggedIn, function(req, res){
	// get data from form and add campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.desc;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = {name: name, image: image, description: desc, author: author};
	// Create a new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			// redirect back to campgrounds page
			console.log(newlyCreated);
			res.redirect("/campgrounds");
		}
	});
	
});

// NEW - a form to create
router.get("/new",isLoggedIn, function(req, res){
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

// EDIT ROUTE
router.get("/:id/edit", function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			res.redirect("/campgrounds");
		} else {
			res.render("campgrounds/edit", {campground: foundCampground});
		}
	});
	
});
// UPDATE ROUTE
router.put("/:id", function(req, res){
	// find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds")
		} else
			// redirect show page
			res.redirect("/campgrounds/" + req.params.id);
	});

});

// DESTROY ROUTE
router.delete("/:id", function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		} else
			res.redirect("/campgrounds");
	});
})

// middleware
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
};

module.exports = router;