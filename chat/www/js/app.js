angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
	  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
	  cordova.plugins.Keyboard.disableScroll(true);	  
      }
      if (window.StatusBar) {
	  StatusBar.styleDefault();
      }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
	.state('tab', {
	    url: '/tab',
	    abstract: true,
	    templateUrl: 'templates/tabs.html'
	})
	.state('tab.chats', {
	    url: '/chats',
	    views: {
		'tab-chats': {
		    templateUrl: 'templates/tab-chats.html',
		    controller: 'ChatsCtrl'
		}
	    }
	})
	.state('tab.chat-detail', {
	    url: '/chats/:chatId',
	    views: {
		'tab-chats': {
		    templateUrl: 'templates/chat-detail.html',
		    controller: 'ChatDetailCtrl'
		}
	    }
	});
  $urlRouterProvider.otherwise('/tab/chats');
});
