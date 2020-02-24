var mongoose = require('mongoose');
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/cat_app", { useNewUrlParser: true });

// adding a new cat to the database
var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// var carrie = new Cat({
// 	name: "amy",
// 	age: 3,
// 	temperament: "slience"
// });

// carrie.save(function(err, cat){
// 	if(err){
// 		console.log("something went wrong");
// 	} else {
// 		console.log("we just save a cat to the DB")
// 		console.log(cat);
// 	}
// });

Cat.create({
	name: "Bubble Dragon",
	age: 12,
	temperament:"gentle"
}, function(err, cat){
	if(err){
		console.log(err);
	} else {
		console.log(cat);
	}
});

// retrieve all cats from the DB and console.log each one

Cat.find({}, function(err, cats){
	if(err){
		console.log("oops! error");
		console.log(err);
	} else {
		console.log("All the cats are...")
		console.log(cats);
	}
})

