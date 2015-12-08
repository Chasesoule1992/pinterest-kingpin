app.controller("searchCtrl", ["$q", "$http", "$scope", "$firebaseArray", "generalVariables",
	function($q, $http, $scope, $firebaseArray, generalVariables) {
	var currentpinId = $scope.currentPin.$id
	console.log("?????" currentpinId)
		$("#searchBtn").click(function(){
			$("#searchBox").val().toLowerCase()

			var tagRef =  new Firebase ("https://kingpinteam.firebaseio.com/pins")	

			var firebaseTag = currentPinId.orderByChild("tags");
		})

		


	// var $ = require("jquery");
	// var movieDataFirebase = require("movie-data-firebase");
	// var movieData = require("movie-data");
	// var movieDom = require("movie-to-dom");
	// var gs = require("get-set");
	// var dom = require("dom");

	
	// //clicking for search. call a promise that will return the movie-data from url
	// $("#searchBox").keypress(function(){
	// 	// Declaring variables for later use
	// 	// Variable for movie search input
	// 	var movieInput;
	// 	// Variable for storing Firebase values
	// 	var firebaseData;
	// 	// Variable for API movie search
	// 	var searchMoviesArray = [];
	// 	// Variable for Firebase movie search
	// 	var myMoviesArray = [];
	// 	// Variable for filtered movies
	// 	var filteredArray = [];
	// 	// Variable for combining movies
	// 	var combinedArray = [];
	// 	// Variable for checking for unique movies
	// 	var uniqueMovies = [];
	// 	if(event.which == 13){
	// 		$("#movie-poster").empty();
	// 		console.log("click is working");
	// 		// Clearing DOM
	// 		// uniqueMovies = [];
	// 		// Getting searchBox input
	// 		movieInput = $("#inputTitle").val().toLowerCase().replace(/ /g, "+");
	// 		console.log("movie input", movieInput);
	// 		// Making Ajax call
	// 		movieData.movies(movieInput)
	// 			// Returning from Ajax
	// 			.then(function(data){
	// 				console.log("data", data);
	// 				// Pushing searched movies into array
	// 				for (var i = 0; i < data.Search.length; i++) {
	// 					searchMoviesArray.push(data.Search[i]);
	// 				}
	// 				console.log("searchMoviesArray", searchMoviesArray);
	// 				// Getting uuid
	// 				var uuid = gs.getUid();
	// 				// Getting Firebase ref
	// 				var movieRef = new Firebase("https://movie-history-app.firebaseio.com/users/" + uuid + "/movies");
	// 				// Getting Firebase keys
	// 				var firebaseKeys = movieRef.orderByChild("imdbID");
	// 				console.log("firebaseKeys", firebaseKeys);
	// 				// Getting snapshot of Firebase
	// 				firebaseKeys.once("value", function(snapshot) {
	// 					firebaseData = snapshot.val();
	// 					console.log("snapshot", firebaseData);
	// 					if (firebaseData === null) {
	// 						combinedArray = searchMoviesArray;
	// 						console.log("combinedArray", combinedArray);
	// 						// Combining search and filtered arrays
	// 						combinedArray = filteredArray.concat(searchMoviesArray);
	// 						console.log("combinedArray", combinedArray);
	// 						// Filtering combinedArray for duplicates
	// 						uniqueMovies = _.uniq(combinedArray, "imdbID");
	// 						console.log("uniqueMovies", uniqueMovies);
	// 						// Sending uniqueMovies through Handlebars
	// 						require(['hbs!../templates/myMovies'], function (formTemplate) {
	//     						console.log("movieDataTemplate is running");
	//     						$("#movie-poster").append(formTemplate(uniqueMovies));
	//     					});
	//     					movieInput = "";
	// 					} else {	
	// 						// Pushing firebase movies into array
	// 						myMoviesArray = $.map(firebaseData, function(element){
	// 							return element;
	// 						});
	// 						// Filtering myMoviesArray to see if a title in Firebase equals the one searched for
	// 						filteredArray = _.filter(myMoviesArray, function (obj) {
	// 	  						if (_.includes(obj.title.toLowerCase(), movieInput)) {
	// 	    						console.log("obj includes", obj.title);
	// 							return obj;
	// 	  						}
	// 						});
	// 						console.log("filteredArray", filteredArray);
	// 						// Combining search and filtered arrays
	// 						combinedArray = filteredArray.concat(searchMoviesArray);
	// 						console.log("combinedArray", combinedArray);
	// 						// Filtering combinedArray for duplicates
	// 						uniqueMovies = _.uniq(combinedArray, "imdbID");
	// 						console.log("uniqueMovies", uniqueMovies);
	// 						// Sending uniqueMovies through Handlebars
	// 						require(['hbs!../templates/myMovies'], function (formTemplate) {
	// 		    				console.log("myMovies is running");
	// 		    				$("#movie-poster").append(formTemplate(uniqueMovies));
	// 		    			});
	// 						// movieDom.movieForm(uniqueMovies);
	// 						movieInput = "";
	// 					}
	// 				});
	// 			});
	
	// 	}//end of if statement
	// });//end of keypress function
	}]);