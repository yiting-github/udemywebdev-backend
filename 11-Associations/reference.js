var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo_2", {useNewUrlParser: true, useUnifiedTopology: true})

// POST - title, content
var PostSchema = new mongoose.Schema({
	title: String,
	content: String
});

var Post = mongoose.model("Post", PostSchema);

// USER - name, email
var UserSchema = new mongoose.Schema({
	name: String,
	email: String,
	posts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post"
	}
	]
});

// Post.create({
// 	title: "how to cook cookies pt.3",
// 	content: "yummy yummy yummy"
// }, function(err, post){
// 	User.findOne({email: "annie@gmail.com"}, function(err, foundUser){
// 		if(err){
// 			console.log(err);
// 		} else {
// 			foundUser.posts.push(post);
// 			foundUser.save(function(err, data){
// 				if(err){
// 					console.log(err);
// 				} else {
// 					console.log(data);
// 				}
// 			});
// 		}
// 	});
// });

var User = mongoose.model("User", UserSchema);

// User.create({
// 	name: "Annie",
// 	email: "annie@gmail.com"
// });


// Find User and Find all posts for that user
User.findOne({email: "annie@gmail.com"}).populate("posts").exec(function(err, user){
	if(err){
		cosole.log(err);
	} else {
		console.log(user);
	}
});
