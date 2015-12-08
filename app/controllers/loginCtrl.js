app.controller("loginCtrl", ["$q", "$http", "$scope", "$firebaseArray", "generalVariables",
	function($q, $http, $scope, $firebaseArray, generalVariables) {

		//private variables
		var currentUid;
		var loadedPins;

		$scope.test= "ben";
		
		$scope.loginEmail;
		$scope.loginPassword;
		$scope.matchedArray=[];

		var ref = new Firebase("https://kingpinteam.firebaseio.com/users");

		//register user
		$scope.registerUser  = function(){
			if( $scope.loginEmail !== "" && $scope.loginPassword !== "" && $scope.loginEmail !== undefined && $scope.loginPassword !== undefined){
				console.log("$scope.loginEmail ", $scope.loginEmail);
				console.log("$scope.loginPassword ", $scope.loginPassword);

				ref.createUser({
				  email    : $scope.loginEmail,
				  password : $scope.loginPassword
				}, function(error, userData) {
				  if (error) {
				    console.log("Error creating user:", error);
				  } else {
				    console.log("Successfully created user account with uid:", userData.uid);
				    currentUid = userData.uid;
				
					ref.child("/"+userData.uid).set({
							"tags": "sports, food",
							"likes": {
								"something": "something"
							},
							"boards": {
								"somthing": "something"
							}
					})

				  }
				});


		} else {
			console.log("you gotta enter info");
		}
	}

	$scope.loginUser = function(){

	  ref.authWithPassword({
	  email    : $scope.loginEmail,
	  password : $scope.loginPassword
	}, function(error, authData) {
	  if (error) {
	    console.log("Login Failed!", error);
	  } else {
	    console.log("Authenticated successfully with payload:", authData);
	    $("#loginSplash").css({"display":"none"})
	    $("#mainPage").fadeIn("slow");

	    var pinRef = new Firebase("https://kingpinteam.firebaseio.com/pins");

	    var pinArray = $firebaseArray(pinRef);

	    pinArray
	    .$loaded()
	    .then(function(data){
	    	console.log("hey", data);
	    	loadedPins = data;

			    //go to current user uid/tags
			    	//convert string of tags into array separated by commas
			    	//for each item in array
			    	//go into pins object
			    		//if pinID.tags === current item in array
			    		//output something to screen
			    console.log("authData ", authData.uid);

			    generalVariables.setUid(authData.uid);
			    
			    console.log("user id ", generalVariables.getUid());

			//go to current user uid/tags
			   var userRef = new Firebase("https://kingpinteam.firebaseio.com/users/"+authData.uid);

			   //this is how you get data from firebase
			   userRef.on("value", function(snapshot) {
				  console.log(snapshot.val().tags);

				  //convert string of tags into array separated by commas
			    	var tags = snapshot.val().tags.split(", ");

			    	console.log("tags ", tags);

			    	//for each item in tags array (tags of current user)
			    	for(var i = 0; i < tags.length; i++){

			    		console.log("currents", loadedPins);



			    		for(var x = 0; x < loadedPins.length; x++){
			    			// console.log("hey", loadedPins[x].tags);
			    			// console.log("tags[i]", tags[i]);

			    			if(loadedPins[x].tags === tags[i]){
			    				console.log("loadedPinsx", loadedPins[x]);
			    				console.log("match sah");
			    				$scope.matchedArray.push(loadedPins[x]);

			    				//$scope.$apply is used when using anything not in angular fire (basically reupdate page)
			    				$scope.$apply();
			    			}
			    		}

			    		console.log("matchedArray", $scope.matchedArray);

			    	}


				}, function (errorObject) {
				  console.log("The read failed: " + errorObject.code);
				});


			  });

			}
	    });


	
	//authWithPassword here and then show main page	

	};

	$scope.showModal = function(tag){
		$("#boardPicker").modal();
		
		console.log("tag", tag);

		$scope.currentPin = tag;

		//reference to firebase
		var boardRef = new Firebase("https://kingpinteam.firebaseio.com/users/"+generalVariables.getUid()+"/boards");

		var boardArray = $firebaseArray(boardRef);


		$scope.boards = boardArray;

		console.log("boardArray ", boardArray);


		//get Boards
		//output to dom in ng-repeat from array
		//scope.apply
	};


	$scope.showAddToBoard = function(item){
		console.log("currentPin ", $scope.currentPin);

		console.log("item ", item);

		var splitBoardTitle = item.$id.split(" ");

		console.log("splitBoardTitle", splitBoardTitle);

		var joinedWithChars = splitBoardTitle.join("%20");

		console.log("joinedWithChars ", joinedWithChars);

		var addBoardRef = new Firebase("https://kingpinteam.firebaseio.com/users/"+generalVariables.getUid()+"/boards/"+joinedWithChars+"/pins");
		$scope.addBoardArray = $firebaseArray(addBoardRef);

		console.log("addBoardArray ", $scope.addBoardArray);

		console.log("$scope.currentpin.$id", $scope.currentPin.$id);

		var currentpinId = $scope.currentPin.$id

		addBoardRef.child(currentpinId).set(currentpinId);

		$("#boardPicker").modal('toggle');



		//get currentpin.$id
		// add to item.$id (which is the current board clicked)

	}


	$scope.likeAPost = function(tag){
		console.log("tag ", tag);

		var currentPinIdForLike = tag.$id;

		console.log("currentPinIdForLike ", currentPinIdForLike);

		var likeRef = new Firebase("https://kingpinteam.firebaseio.com/users/"+generalVariables.getUid()+"/likes");

		likeRef.child(currentPinIdForLike).set(currentPinIdForLike);

	}


	


}]);