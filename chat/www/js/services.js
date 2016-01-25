var url = 'http://localhost:8000/';

angular.module('starter.services', [])

.factory('socket', function($rootScope) {
    var socket = io.connect(url);
    return {
	on: function (eventName, callback) {
	    socket.on(eventName, function () {  
		var args = arguments;
		$rootScope.$apply(function () {
		    callback.apply(socket, args);
		});
	    });
	},
	emit: function (eventName, data, callback) {
	     socket.emit(eventName, data, function () {
		 var args = arguments;
		 $rootScope.$apply(function () {
		     if (callback) {
			 callback.apply(socket, args);
		     }
		 });
	     })
	 }
     };
})

.factory('Chats', function() {
 var chats = [];

  return {
      count: function(){
	  return chats.length;
      },
      all: function() {
	  return chats;
      },
      fill: function(object){
	  chats.push(object);
      },
      get: function(chatId) {
	  for (var i = 0; i < chats.length; i++) {
              if (chats[i].id === parseInt(chatId)) {
		  return chats[i];
              }
	  }
	  return null;
      }
  };
});
