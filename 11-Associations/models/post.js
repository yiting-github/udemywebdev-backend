var mongoose = require("mongoose");

// POST - title, content
var PostSchema = new mongoose.Schema({
	title: String,
	content: String
});


module.exports = mongoose.model("Post", PostSchema);