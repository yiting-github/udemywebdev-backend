var mongoose = require("mongoose"),
	express  = require("express"),	
	app     = express();
	

mongoose.connect("mongodb://localhost:27017/auth_demo_app", {useNewUrlParser: true, useUnifiedTopology: true});
app.set("view engine", "ejs");


app.get("/", function(req, res){
	res.render("home");
})

app.get("/secret", function(req, res){
	res.render("secret");	
});

app.listen("3000",function(){
	console.log("server start!")
});