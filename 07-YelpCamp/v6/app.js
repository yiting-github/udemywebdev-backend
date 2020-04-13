var express       = require("express"),
	app           = express(),
	bodyParser    = require("body-parser"),
	mongoose      = require("mongoose"),
	passport      = require("passport"),
	LocalStrategy = require("passport-local"),
	Campground    = require("./models/campground"),
	Comment	      = require("./models/comment"),
	User          = require("./models/user"),
	seedDB        = require("./seeds");
	


mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp_v6", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); // serve the public folder
seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Tomorrow will be fine!",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// little middleware on every route
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});



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
			res.render("campgrounds/index", {campgrounds: allCampgrounds });
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
			res.redirect("/campgrounds");
		} else {
			// redirect back to campgrounds page
			res.redirect("/campgrounds");
		}
	});
	
});

// NEW - a form to create
app.get("/campgrounds/new", function(req, res){
	res.render("campgrounds/new");
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
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});

})

// =======================
// COMMENTS ROUTES
// =======================

// new comments form
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
	// find campground by id
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
	
});
 

// CREATE
app.post("/campgrounds/:id/comments", isLoggedIn,  function(req, res){
	// lookup campground using ID
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds")
		} else {
			// create new comment
			Comment.create(req.body.comment, function(err,comment){
				if(err){
					console.log(err);
				} else{
					// connect new comment to campground
					campground.comments.push(comment);
					campground.save();
					// redirect to campground show page
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});

});

// ============
// AUTH Routes 

// REIGSTER
app.get("/register", function(req, res){
	res.render("register");
});

// handle sign up logic
app.post("/register", function(req,res){
	var newUser = new User({username: req.body.username})
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/campgrounds");
		});
	});
});

// show login form
app.get("/login", function(req, res){
	res.render("login");
});

// handling login logic
app.post("/login",passport.authenticate("local", 
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}), function(req, res){
});

// logout routes
app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}
// ============

app.listen(3000, function(){
	console.log("The YelpCamp server is running!");
});