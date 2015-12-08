app.controller("loginCtrl", ["$q", "$http", "$scope", "$firebaseArray", "generalvariables",
	function($q, $http, $scope, $firebaseArray, generalvariables) {

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

			    generalvariables.setUid(authData.uid);
			    
			    console.log("user id ", generalvariables.getUid());

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

	


}]);