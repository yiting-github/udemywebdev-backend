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

var carrie = new Cat({
	name: "carrie",
	age: 6,
	temperament: "cute"
});

carrie.save(function(err, cat){
	if(err){
		console.log("something went wrong");
	} else {
		console.log("we just save a cat to the DB")
		console.log(cat);
	}
});
// retrieve all cats from the DB and console.log each one