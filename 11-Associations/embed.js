var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo", {useNewUrlParser: true, useUnifiedTopology: true})

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
	posts: [PostSchema]
});

var User = mongoose.model("User", UserSchema);



// var newUser = new User({
// 	name: "Snoopy",
// 	email: "Snoopy@snoopy.com"
// });

// newUser.posts.push({
// 	title: "How to go to Youtube",
// 	content: "Google search youtube then click first link"
// })

// newUser.save(function(err, user){
// 		  if(err){
// 			  console.log(err);
// 		  } else {
// 			console.log(user);
// 		  }
// });

User.findOne({name: "Snoopy"}, function(err, user){
	if (err){
		// console.log(err);
	} else {
		user.posts.push({
			title: "3 things that I hate",
			content: "Mushroom, Mushroom, Mushroom"
		});
		
		user.save(function(err, user){
			if(err){
				console.log(err);
			} else {
				console.log(user);
			}
		});
	}
});

// var newPost = new Post({
// 	title: "Eleven said",
// 	content: "Friends don't lie"
// });

// newPost.save(function(err, post){
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log(post);
// 	}
// })
