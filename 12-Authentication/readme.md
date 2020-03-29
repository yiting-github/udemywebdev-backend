# Authentication

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