app.controller("profileCtrl", 
	["$q", "$http", "$scope", "$firebaseArray", "generalVariables",
	function($q, $http, $scope, $firebaseArray, generalVariables) {

		// set current logged in user's ID to 'currentUid'
		var currentUid = generalVariables.getUid();
		console.log("currentUid", currentUid);

		// get reference to the user's boards in firebase and set it to 'userBoardRef'
		var userBoardRef = new Firebase("https://kingpinteam.firebaseio.com/users/" + currentUid + "/boards");

		// takes user's firebase boards reference and turn it into an array because Angular likes that, and 
		// called it $scope.userBoardArray. Also, must use $scope here because anytime we are interacting with 
		// the DOM and using Angular we need $scope.
		$scope.userBoardArray = $firebaseArray(userBoardRef);
		console.log("userBoardArray", $scope.userBoardArray);

		// let's dive deeper into the user's Firebase reference and get an array of all of their pins inside 
		// of their boards.
		var pinsRef = new Firebase("https://kingpinteam.firebaseio.com/users/" + currentUid + "/boards/pins");
		console.log("pinsRef", pinsRef);

		$scope.userPinArray = $firebaseArray(pinsRef);
		console.log("$scope.userPinArray", $scope.userPinArray);




	}]);