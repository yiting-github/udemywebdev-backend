var mongoose = require ("mongoose");

var commentSchema = new mongoose.Schema({
	text: String,
	createdAt: {type: Date, Default: Date.now},
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
		},
		username: String
	}
});

module.exports = mongoose.model("Comment", commentSchema);