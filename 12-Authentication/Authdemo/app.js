var express               = require("express"),	
	mongoose              = require("mongoose"),
	passport              = require("passport"),
	bodyParser            = require("body-parser"),
	User                  = require("./models/user"),
	LocalStrategy         = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose"),
	app                   = express();
	

mongoose.connect("mongodb://localhost:27017/auth_demo_app", {useNewUrlParser: true, useUnifiedTopology: true});

app.use(require("express-session")({
	secret: "Sodagreen's new song - Tomorrow will be fine!",
	resave: false,
	saveUninitialized: false
}));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ===================
// Routes
// ===================

app.get("/", function(req, res){
	res.render("home");
})

app.get("/secret",isLoggedIn, function(req, res){
	res.render("secret");	
});

// Auth Routes

// show sign up form
app.get("/register", function(req,res){
	res.render("register");
});
// handling user sign up
app.post("/register", function(req,res){
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("register");
		} 
		passport.authenticate("local")(req, res, function(){
			res.redirect("/secret");
		});
	});
});


// LOGIN ROUTES
// render login form
app.get("/login", function(req,res){
	res.render("login");
});

// login logic
// middleware runs between the begin and the end final callback
app.post("/login", passport.authenticate("local", {
	successRedirect: "/secret",
	failureRedirect: "/login"
}) ,function(req,res){
});

// logout routes
app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/");
})

//middleware isLoggedIn
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

app.listen("3000",function(){
	console.log("server start!")
});