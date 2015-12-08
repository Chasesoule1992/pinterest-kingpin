app.factory("generalVariables", ["$q", "$http",
  function($q, $http) {

  	var userUid;

  	return {
  		getUid : function(){
  			return userUid;
  		},

  		setUid : function(value){
  			userUid = value;
  		},
      getData: function() {
        console.log("returning user interests", userInterests);
        return userInterests;
      },
  	}

  }]);