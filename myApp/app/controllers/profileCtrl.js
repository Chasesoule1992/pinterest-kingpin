app.controller("profileCtrl", 
	["$q", "$http", "$scope", "$firebaseArray", "generalVariables",
	function($q, $http, $scope, $firebaseArray, generalVariables) {

		$scope.boardObjects = [];

		// set current logged in user's ID to 'currentUid'
		var currentUid = generalVariables.getUid();
		console.log("currentUid", currentUid);

		// get reference to the user's boards in firebase and set it to 'userBoardRef'
		var userBoardRef = new Firebase("https://kingpinteam.firebaseio.com/users/" + currentUid + "/boards");

		// takes user's firebase boards reference and turn it into an array because Angular likes that, and 
		// called it $scope.userBoardArray. Also, must use $scope here because anytime we are interacting with 
		// the DOM and using Angular we need $scope.
		$scope.userBoardArray = $firebaseArray(userBoardRef);
		console.log("boards ",  $scope.userBoardArray);


		

		$scope.userBoardArray.$loaded()
			.then(function(data) {

			});

		
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
    	};
		
    	$scope.showBoard = function() {
    		$("#boardModal").modal();
    	};

    	$scope.showUserBoards = function() {
    		$("#userBoards").css({"display" : "block"});
    		$("#userPins").css({"display" : "none"});
    		$("#userLikes").css({"display" : "none"});
    	};

    	$scope.showUserPins = function() {
    		$("#userPins").css({"display" : "block"});
    		$("#userBoards").css({"display" : "none"});
    		$("#userLikes").css({"display" : "none"});
    	};
		
    	$scope.showUserLikes = function() {
    		$("#userLikes").css({"display" : "block"});
    		$("#userBoards").css({"display" : "none"});
    		$("#userPins").css({"display" : "none"});
    	};

    	$scope.showPinModal = function() {
    		$("#pinModal").modal();

    	};

    	$scope.addPinToUser = function() {
    		var pinTitle = $("#pinTitle").val();
    		var pinUrl = $("#pinUrl").val();
    		var pinPicUrl = $("#pinPicUrl").val();
    		var pinTags = $("#pinTags").val();

    		var pinRef = new Firebase("https://kingpinteam.firebaseio.com/pins");

    		pinRef.push({
    			"title" : pinTitle,
    			"pinUrl" : pinUrl,
    			"picture": pinPicUrl,
    			"tags": pinTags
    		})

    	};




	}]);

