// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ionic.cloud', 'starter.controllers', 'starter.services'])

//推播
.controller('MyCtrl', function($scope, $ionicPush) {
  $ionicPush.register().then(function(t) {
	return $ionicPush.saveToken(t);
	}).then(function(t) {
		console.log('Token saved:', t.token);
	});

  $scope.$on('cloud:push:notification', function(event, data) {
	var msg = data.message;
	alert(msg.title + ': ' + msg.text);
	});
})

.config(function($stateProvider, $urlRouterProvider, $ionicCloudProvider) {
	
  $stateProvider

        .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'GoodrateCtrl',
        resolve: {
            "check": function($location) {

                if (sessionStorage.getItem('id')) {

                    $location.path('tab/dash');
                }

            }
        }
    })

    .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })

    // 簽到
    .state('tab.dash', {
        url: '/dash',
        views: {
            'tab-dash': {
                templateUrl: 'templates/tab-dash.html',
                controller: 'GoodrateCtrl'
            }
        }
    })

    // 個人資訊
    .state('tab.profile', {
        url: '/profile',
        views: {
            'tab-profile': {
                templateUrl: 'templates/profile.html',
                controller: 'profileCtrl'
            }
        }
    })

    // 簽退
    .state('tab.chats', {
        url: '/chats',
        views: {
            'tab-chats': {
                templateUrl: 'templates/check_out.html',
                controller: 'GoodrateCtrl'
            }
        }
    })

    // 器材檢核
    .state('tab.account', {
        url: '/account',
        views: {
            'tab-account': {
                templateUrl: 'templates/equcheck.html',
                controller: 'EquCtrl'
            }
        }
    })

    // 良率檢核
    .state('tab.goodrate', {
        url: '/goodrate',
        views: {
            'tab-goodrate': {
                templateUrl: 'templates/goodrate.html',
                controller: 'EquCtrl'
            }
        }
    })

    .state('tab.goodrate-datail', {
        url: '/goodrate/:id',
        views: {
            'tab-goodrate': {
                templateUrl: 'templates/goodrate-detail.html',
                controller: 'EquCtrl'
            }
        }
    });

    // 預設頁面::登入頁面
    $urlRouterProvider.otherwise('/login');
  
  //推播
  $ionicCloudProvider.init({
    "core": {
      "app_id": "579833b5"
    },
    "push": {
      "sender_id": "380581124845",
      "pluginConfig": {
        "ios": {
          "badge": true,
          "sound": true
        },
        "android": {
          "iconColor": "#343434"
        }
      }
    }
  });
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
