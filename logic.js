// Firebase Key 
	  var config = {
	    apiKey: "AIzaSyDe9M5ZEuiFezeRc-b5H4XsfaXRss_uTQI",
	    authDomain: "employee-tracker-67328.firebaseapp.com",
	    databaseURL: "https://employee-tracker-67328.firebaseio.com",
	    projectId: "employee-tracker-67328",
	    storageBucket: "employee-tracker-67328.appspot.com",
	    messagingSenderId: "177719825996"
	  };
	  // Initialize firebase
	  firebase.initializeApp(config);

	  var database = firebase.database();

	  var ref = database.ref();


// On click function for submit button: 
	$("#train-schedule-submit").on("click", function(e) {
		// form validation without refresh
		var inpObj = $("#train-form");
	    if (inpObj[0].checkValidity() === false) {
	      return
	    } else {
	      e.preventDefault() 
	    }

// TAKE IN USER INPUTS
	    var first = $("#train-first").val().trim();
	    var name  = $("#train-name").val().trim();
	    var destination = $("#train-destination").val().trim();
	    var frequency = parseInt($("#train-frequency").val().trim());


// Calculated variables
	
	    var currentTime = moment();
	    var tC = first.split(":");
	    var timeConvert = moment().hours(tC[0]).minutes(tC[1]).second(00);
	  	var difference = (moment().diff(moment(timeConvert), "minutes"));
	  	console.log(difference);


// Calculate time until next train:
	  	 while (difference > 0) {
	  	 	timeConvert = moment(timeConvert).add(frequency, "minutes");

	  	 	console.log(timeConvert);

	  	 	difference = moment().diff(moment(timeConvert), "minutes");

	  	 	console.log(difference);

			Math.abs(difference) 

			var finalDifference = Math.abs(difference)

			console.log(finalDifference);
	  	 }

var nextTrain = moment(timeConvert).format("hh:mm");



// TEST / CHECK MY VARIABLES
		console.log(name),
		console.log(destination);
		console.log(frequency);
		console.log(nextTrain);
		console.log(finalDifference);



//PUSH VARIABLES TO DATABESE


	  		ref.push({
	  			dBName:name,
	  			dBDestination:destination,
	  			dBFrequency:frequency,
	  			dBNextArrival:nextTrain,
				dBMinutesAway:finalDifference
	  		})
	    // console.log(employee);
	    // later check if employee already added 
	    $("form").trigger("reset"); // clear form
	    return false; // prevent page refresh
	});



// Create Variables for elements to append to HTML
database.ref().on("child_added", function(snapshot) {
	var postData = $("<tr>")
	var postName = $("<td id='name'>");
	var postDestination = $("<td id='destination'>");
	var postFrequency = $("<td id='frequency'>");
	var postArrival = $("<td> id='arrival'");
	var postNext = $("<td id='next'>");

// take my current variables and apply values from the database
	postName.text(snapshot.val().dBName);
	postDestination.text(snapshot.val().dBDestination);
	postFrequency.text(snapshot.val().dBFrequency);
	postArrival.text(snapshot.val().dBNextArrival);
	postNext.text(snapshot.val().dBMinutesAway);


//Append data to table body in HTML
	$("#table-body").append(postData, postName, postDestination, postFrequency, postArrival, postNext);
	console.log("#table-body");


})


