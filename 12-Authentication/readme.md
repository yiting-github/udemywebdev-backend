A# Authentication

## Intro to Auth

* What tools are we using?
	* Passport.js - a Authentication middleware for Node.js
		* 500+ Strategies Now! Strategies means authentication different types. (e.g. Email and password or google. facebook services)
	* Passport Local(Package)
	 
	* Passport Local Mongoose (Package)
	 * is made for mongoose


	
* Walk through auth flow
secrect page - if someone don't log in then will not get secret content
login - can see secrect page after login
log out 

* Discuss seessions
 * Sessions
	* HTTP is stateless, your request is a transaction, not to link any information so use sessions make HTTP stateless.
	* allow us to have states in our HTTP requests
		1. someon logged in -> a little bit encoded information are saved in requests
		
		2. server -> get some information from requests and crack/unencrypted and it will use that information to tell if someone is logged in or out
	
	
 * Express-Session
 
## Auth Code Along Part 1 
* Set up folder structure
* Install nedded packages
* Add root route and template 
* Add secret route and template

## Auth Code Along Part 2 
* Create User model
* Configure passport
 * Add passportLocalMongoose package
	```UserSchema.plugin(passportLocalMongoose);```
 * Basic passport set up
 	app.js
	```
	app.use(passport.initialize());
	app.use(passport.session());
	```
	* Passport Encode and Decode
	
	```
	passport.serializeUser(User.serializeUser());
	passport.dserializeUser(User.deserializeUser());
	```
 * express-sessions set up app.js
 
	```
	app.use(require("express-session")({
		secret: "Sodagreen's new song - Tomorrow will be fine!",
		resave: false,
		saveUninitialized: false
}));
```
	** new session does a few things, generate a unique session id, store id in a session cookie and saveUninitialized is true will be stored in the session store **
	
	** saveUninitialized:false means the request of session object haven't been modified, the session object is empty and will be not stored in session store.  **
	
	** resave: it tell the session stores that a particular session is still active.May have to be enabled for seesion stores that don't support the touch command. **

## Auth Code Along Part 3
* Add Register Routes
	```
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
```
	** register create username but don't create password at the time, the second argument is password. **
	
	** passport authenticate("local"), local can be twitter or facebook or google many auth ways, authenticate also would encrypt(serializeUser) the password to hash then store in database.**
* Add Register Form

## Auth Code Along Part 4
* Add Login routes
	* GET AND POST 
		* use middleware on login logic
```
app.post("/login",passport.authenticate("local", {
	successRedirect: "/secret",
	failureRedirect: "/login"
}) ,function(req,res){
});
```
		* add new LocalStrategy
		```
		passport.use(new LocalStrategy(User.authenticate()));
		```
		** User.authenticate() is coming from passportLocalMongoose we don't need write authenticate method **

* Add Login form