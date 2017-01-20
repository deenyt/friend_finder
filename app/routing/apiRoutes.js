//  ******
// loading data from the friends api
//  *****
var friendsList = require('../data/friends.js');
var path = require('path');

// ******
// Routing
// ******

module.exports = function(app) {

	var friendData = [];

	app.get('/api/friends', function(req, res){
		res.json(friendsList);
	});

	app.post('/api/friends', function(req, res){
		
		var friendChoice = [];
			// score each of the friends for comparison
			for(var i = 0; i < friendsList.length; i++){

				var differences = [];
				// find the score of the stored Friends compared to the New Friend
				for(var x = 0; x < friendsList[i].scores.length; x++){
					var diff;
					 if(friendsList[i].scores[x] > req.body.scores[x]){
						 diff = friendsList[i].scores[x] - req.body.scores[x];
						 differences.push(diff);
						}
					else if(friendsList[i].scores[x] < req.body.scores[x]){
						 diff = req.body.scores[x] - friendsList[i].scores[x];
						 differences.push(diff);
						}
					else if(friendsList[i].scores[x] == req.body.scores[x]){
						diff = 0;
						differences.push(diff);
					}
				}

				function add(a, b){
					return a + b;
				};

				differences = differences.reduce(add, 0);

				friendChoice.push({
					name: friendsList[i].name,
					picture: friendsList[i].picture,
					scores: differences
				});		
			}  // end of for loop

		var goodChoice = Math.min(friendChoice[0].scores, friendChoice[1].scores, friendChoice[2].scores, friendChoice[3].scores);

		// sets res to the best choice
		if(goodChoice == friendChoice[0].scores){
			res.json(friendChoice[0]);
		}
		else if(goodChoice == friendChoice[1].scores){
			res.json(friendChoice[1]);
		}
		else if(goodChoice == friendChoice[2].scores){
			res.json(friendChoice[2]);
		}
		else if(goodChoice == friendChoice[3].scores){
			res.json(friendChoice[3]);
		}
	
	});	// end of post command

};  // end of exports module
