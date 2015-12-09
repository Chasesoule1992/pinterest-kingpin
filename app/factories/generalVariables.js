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

      logOutUser : function(){
        var ref = new Firebase("https://kingpinteam.firebaseio.com");
        ref.unauth(); 
        $("body").css({"background-image" : "url('https://images.unsplash.com/photo-1429043794791-eb8f26f44081?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=57a0d4331324166cc417855ff8da1240')"}); 
      }
  	}

  }]);