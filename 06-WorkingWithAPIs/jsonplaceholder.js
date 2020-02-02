var rp = require('request-promise');
// var request = require('request');

rp('https://jsonplaceholder.typicode.com/users/1') 
	.then(function(htmlString){
		var parsedData = JSON.parse(htmlString);
		console.log(parsedData["name"] + "'s email is " + parsedData["email"]);
	})
	.catch(function(err){
		console.log(err);
	})