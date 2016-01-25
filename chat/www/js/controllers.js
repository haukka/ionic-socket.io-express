angular.module('starter.controllers', [])

.controller('ChatsCtrl', function($scope, Chats, socket, $rootScope) {
    console.log(socket);
    socket.on('newcon', function(message){
	socket.emit('AddUser', 'new user');
    });

    socket.on('list', function(list){
	if (Chats.count() == 0) {
	    for(var i = 0; i < list.userlist.length; i++){
		Chats.fill(list.userlist[i]);
	    }
	}
    });
    $scope.chats = Chats.all();
    $rootScope.hideTabs = false;
})

.controller('ChatDetailCtrl', function($scope, socket, $stateParams, Chats, $rootScope) {
    console.log(socket);
    $scope.id = 1;
    $scope.message = {};

    $scope.send_message = function(message) {
	$scope.message[$scope.id] = {"sender": 0, "value": message};
	$scope.id++;
	socket.emit('message', message);
    }

    socket.on('mess_answer', function(res) {
	$scope.message[$scope.id] = {"sender": 1, "value": res.message};
	$scope.id++;
    });

    $scope.chat = Chats.get($stateParams.chatId);
    $rootScope.hideTabs = true;
});
