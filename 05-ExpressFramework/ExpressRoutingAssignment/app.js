var express = require("express");// require express
var app = express();

app.get("/", function(req, res){
    res.send("Hi there, welcome to my assignment!");
});

// animal
app.get("/speak/:animalName", function(req, res){
    var animal = req.params.animalName.toLowerCase();
    var sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof Woof",
        cat: "Meow",
        bird:"..."
    }
    var sound = sounds[animal];
    res.send("The " + animal + " says '" + sound + "'");
});

//repeat string by number
app.get("/repeat/:str/:num", function(req, res){
    var inputStr = req.params.str;
    var number = Number(req.params.num);
    var OutputStr = "";
    for (var i = 0; i < number; i++){
        OutputStr += inputStr + " ";
    }
    res.send(OutputStr);
});

// other route
app.get("*", function(req, res){
    res.send("Sorry, page not found...What are you doing with your life?")
});

// listen port 3000
app.listen("3000", function(){
    console.log("Server listening on port 3000");
});