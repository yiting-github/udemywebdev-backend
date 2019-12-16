function average(arrScore){
	// add all score together
	var sum= 0;
	arrScore.forEach(function(item){
 		sum += item;
	});
	
	// divide by sum of scores
	var arrAverage = Math.round(sum / arrScore.length);
	return arrAverage;
}


var score = [90, 98, 89, 100, 100, 86, 94];
console.log(average(score)); // 94

var score2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];
console.log(average(score2)); // 68