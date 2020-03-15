var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo_2", {useNewUrlParser: true, useUnifiedTopology: true})

var Post = require("./models/post");
var User = require("./models/user");

// Post.create({
// 	title: "how to cook cookies pt.4",
// 	content: "yummy yummy yummy x4 "
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
