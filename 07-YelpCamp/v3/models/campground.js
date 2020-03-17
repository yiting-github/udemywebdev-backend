var mongoose = require("mongoose");
//Schema Setup
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	comments: String
});

// compile to model

module.exports = mongoose.model("Campground", campgroundSchema);