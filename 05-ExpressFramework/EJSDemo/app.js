var express = require("express");
var app = express();

// serve public contents
app.use(express.static("public"));
// tell express  use ejs file ahead of time
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
});

app.get("/posts", function(req, res){
    var posts = [
        {title: "Post1", author: "Ray"},
        {title: "My adorable pet bunny", author: "Charlie"},
        {title: "Can you believe this pomsky?", author: "Crown"}
    ];
    res.render("posts", { posts: posts });
});

app.get("/fallinlovewith/:thing", function(req, res){
    var thing = req.params.thing;
    res.render("love",{ thingVar: thing});
});

app.listen("3000", function(){
    console.log("Server listening port 3000");
});