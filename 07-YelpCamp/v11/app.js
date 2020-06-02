var express       = require("express"),
	app           = express(),
	bodyParser    = require("body-parser"),
	mongoose      = require("mongoose"),
	passport      = require("passport"),
	LocalStrategy = require("passport-local"),
	methodOverride= require("method-override"),
	Campground    = require("./models/campground"),
	Comment	      = require("./models/comment"),
	User          = require("./models/user"),
	seedDB        = require("./seeds"),
	cookieParser  = require("cookie-parser"),
	flash         = require("connect-flash");

// requiring routes
var campgroundRoutes = require("./routes/campgrounds"),
	commentRoutes    = require("./routes/comments"),
	indexRoutes      = require("./routes/index");


mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp_v9", { useNewUrlParser: true , useFindAndModify: false});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); // serve the public folder
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); // seed the database

// PASSPORT CONFIGURATION
app.use(cookieParser());
app.use(require("express-session")({
	secret: "Tomorrow will be fine!",
	resave: false,
	saveUninitialized: false,
}));



app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// little middleware on every route
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error =  req.flash('error');
	res.locals.success = req.flash("success");
	next();
});



app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);



app.listen(3000, function(){
	console.log("The YelpCamp server is running!");
});