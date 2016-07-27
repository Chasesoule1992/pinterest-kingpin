app.controller("loginCtrl", ["$q", "$http", "$scope", "$firebaseArray", "generalVariables",
	function($q, $http, $scope, $firebaseArray, generalVariables) {

		//private variables
		var currentUid;
		var loadedPins;
		var currentPinClickedOn;

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
					});

				  }
				});


		} else {
			console.log("you gotta enter info");
		}
	};

	$scope.loginUser = function(){

	console.log("general vars uid ", generalVariables.getUid());

	  ref.authWithPassword({
	  email    : $scope.loginEmail,
	  password : $scope.loginPassword
	}, function(error, authData) {
	  if (error) {
	    console.log("Login Failed!", error);
	  } else {
	    console.log("Authenticated successfully with payload:", authData);
	    $("#loginSplash").css({"display":"none"});
	    $("#mainPage").fadeIn("slow");
	    generalVariables.setUid(authData.uid)

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

	$scope.showSinglePostModal = function(tag){

		$scope.singlePost = tag;
		currentPinClickedOn = tag;

		console.log("currentPinClickedOn", currentPinClickedOn);

		console.log("single post ", $scope.singlePost);
		$("#singlePostModal").modal();
	}

	$scope.showModalFromSingle = function(){
		currentPinClickedOn;
		$("#singlePostModal").modal("toggle");
		$scope.showModal(currentPinClickedOn);
	}

	$scope.likeModalFromSingle = function(){
		$scope.likeAPost(currentPinClickedOn);
		$("#singlePostModal").modal("toggle");
		console.log("should add like");
	} 


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

		console.log("scope.currentpin ", $scope.currentPin);

		var currentPin = $scope.currentPin;

		console.log("currentPin", currentPin);

		$scope.addBoardArray.$loaded()
		.then(function(){

				$scope.addBoardArray.$add(currentPin);
				$("#boardPicker").modal("toggle");

		});

		// addBoardRef.child(currentpinId).set(currentPin);
		// $("#boardPicker").modal('toggle')
	



		//get currentpin.$id
		// add to item.$id (which is the current board clicked)

	}


	$scope.likeAPost = function(tag){
		console.log("tag ", tag);

		currentPinClickedOn = tag;
		var currentPinIdForLike = tag.$id;

		console.log("currentPinIdForLike ", currentPinIdForLike);

		var likeRef = new Firebase("https://kingpinteam.firebaseio.com/users/"+generalVariables.getUid()+"/likes");

		likeRef.child(currentPinIdForLike).set(currentPinIdForLike);

	}

	$scope.addBoard = function(){
			
			$("#boardPicker").modal("toggle");
			$("#boardModal").modal();

	}

	$scope.addBoardToUser = function(){
		var boardRef = new Firebase("https://kingpinteam.firebaseio.com/users/"+generalVariables.getUid()+"/boards");
		
		//set to new board
		var title = $("#addBoard").val();

		console.log("title ", title);
		boardRef.child(title).set({
			pins: {
				"somePinHere":"somePinHere"
			}
		});


	}


	


}]);