// This program collects the input survey results
//    a pop-up modal is used to display the results

var theFriend;

function User(name, pic, answers){
	this.name = name;
	this.picture = pic;
	this.scores = answers;
};

var getInfo = function(){
	var friend = {
	friendName: $('#name').val().trim(),
	imLink: $('#image-link').val().trim(),
	answers: []
	}
	// add the answers to the array
	friend.answers.push($('#q1').val().trim());
	friend.answers.push($('#q2').val().trim());
	friend.answers.push($('#q3').val().trim());
	friend.answers.push($('#q4').val().trim());
	friend.answers.push($('#q5').val().trim());
	friend.answers.push($('#q6').val().trim());
	friend.answers.push($('#q7').val().trim());
	friend.answers.push($('#q8').val().trim());
	friend.answers.push($('#q9').val().trim());
	friend.answers.push($('#q10').val().trim());

	theFriend = new User(friend.friendName, friend.imLink, friend.answers);

	// current URL
	var currentUrl = window.document.origin;

	$.post(currentUrl + '/api/friends', theFriend, function(data){

	 	var theNewFriend = data;

		popUpResults(theNewFriend);

	 });

	 return false;
};  // end function getInfo 

function goBackHome(){
	location.replace("./home");
};


function popUpResults(theNewFriend){	

	// Get the modal
	var modal = document.getElementById('myModal');

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks the submit button, open the modal 
 	$("#friend-name").append(theNewFriend.name);

 	var x = document.createElement("IMG");
    x.setAttribute("src", theNewFriend.picture);
    x.setAttribute("width", "304");
    x.setAttribute("width", "228");
    x.setAttribute("alt", "The New Friend");
   	$('#friend-image').append(x);
 
    modal.style.display = "block";

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
    	modal.style.display = "none";
    	goBackHome();
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
    	if (event.target == modal) {
       	 modal.style.display = "none";
        	goBackHome();
    	}
	}

};  // end function popUpResults - Modal

// Submit button clicked
$('#submit-survey').on('click', getInfo);











