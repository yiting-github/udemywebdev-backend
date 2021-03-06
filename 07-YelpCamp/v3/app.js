var express    = require("express"),
	app        = express(),
	bodyParser = require("body-parser"),
	mongoose   = require("mongoose"),
	Campground = require("./models/campground"),
	seedDB     = require("./seeds");


mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();


	
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
			res.render("new");
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
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if (err){
			console.log(err);
		} else {
			console.log(foundCampground);
			// render show template with that campground
			res.render("show", {campground: foundCampground});
		}
	});

})

app.listen(3000, function(){
	console.log("The YelpCamp server is running!");
});