// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var starter = angular.module('starter', ['ionic', 'ngCordova']);

starter.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/app.html"
    })
    .state('app.equipment', {
      url: "/equipment",
      views: {
        'equipment-tab': {
          templateUrl: "templates/equipment.html"
        }
      }
    })
    .state('app.checkout', {
      url: "/equipment/checkout",
      views: {
        'equipment-tab': {
          templateUrl: "templates/checkout.html",
          controller: "CheckoutCtrl"
        }
      }
    })
    .state('app.checkin', {
      url: "/equipment/checkin",
      views: {
        'equipment-tab': {
          templateUrl: "templates/checkin.html",
          controller: "CheckinCtrl"
        }
      }
    })
    .state('app.lookup', {
      url: "/equipment/lookup",
      views: {
        'equipment-tab': {
          templateUrl: "templates/lookup.html",
          controller: "LookupCtrl"
        }
      }
    })
    .state('app.trainee', {
      url: "/trainee",
      views: {
        'trainee-tab': {
          templateUrl: "templates/trainee.html"
        }
      }
    })
    .state('app.search', {
      url: "/trainee/search",
      views: {
        'trainee-tab': {
          templateUrl: "templates/search.html",
          controller: "SearchCtrl"
        }
      }
    })
    .state('app.read-card', {
      url: "/trainee/read_card",
      views: {
        'trainee-tab': {
          templateUrl: "templates/read_card.html",
          controller: "ReadCtrl"
        }
      }
    })
    .state('app.employee', {
      url: "/employee",
      views: {
        'employee-tab': {
          templateUrl: "templates/employee.html"
        }
      }
    })
    .state('app.login', {
      url: "/employee/login",
      views: {
        'employee-tab': {
          templateUrl: "templates/login.html",
          controller: "LoginCtrl"
        }
      }
    })
    .state('app.logout', {
      url: "/employee/logout",
      views: {
        'employee-tab': {
          templateUrl: "templates/logout.html",
          controller: "LogoutCtrl"
        }
      }
    })
    .state('app.patrol', {
      url: "/employee/patrol",
      views: {
        'employee-tab': {
          templateUrl: "templates/patrol.html",
          controller: "PatrolCtrl"
        }
      }
    })
    .state('app.find_trainee', {
      url: "/find_trainee",
      views: {
        'equipment-tab': {
          templateUrl: "templates/find_trainee.html",
          controller: "FindTraineeCtrl"
        }
      }
    });

  $urlRouterProvider.otherwise("/app/equipment");
})
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.directive('searchBar', [function () {
  return {
    scope: {
      ngModel: '='
    },
    require: ['^ionNavBar', '?ngModel'],
    restrict: 'E',
    replace: true,
    template: '<ion-nav-buttons side="right">'+
            '<div class="searchBar">'+
              '<div class="searchTxt" ng-show="ngModel.show">'+
                  '<div class="bgdiv"></div>'+
                  '<div class="bgtxt">'+
                    '<input type="text" placeholder="Procurar..." ng-model="ngModel.txt">'+
                  '</div>'+
                '</div>'+
                '<i class="icon placeholder-icon" ng-click="ngModel.txt=\'\';ngModel.show=!ngModel.show"></i>'+
            '</div>'+
          '</ion-nav-buttons>',
    
    compile: function (element, attrs) {
      var icon=attrs.icon
          || (ionic.Platform.isAndroid() && 'ion-android-search')
          || (ionic.Platform.isIOS()     && 'ion-ios7-search')
          || 'ion-search';
      angular.element(element[0].querySelector('.icon')).addClass(icon);
      
      return function($scope, $element, $attrs, ctrls) {
        var navBarCtrl = ctrls[0];
        $scope.navElement = $attrs.side === 'right' ? navBarCtrl.rightButtonsElement : navBarCtrl.leftButtonsElement;
        
      };
    },
    controller: ['$scope','$ionicNavBarDelegate', function($scope,$ionicNavBarDelegate){
      var title, definedClass;
      $scope.$watch('ngModel.show', function(showing, oldVal, scope) {
        if(showing!==oldVal) {
          if(showing) {
            if(!definedClass) {
              var numicons=$scope.navElement.children().length;
              angular.element($scope.navElement[0].querySelector('.searchBar')).addClass('numicons'+numicons);
            }
            
            title = $ionicNavBarDelegate.getTitle();
            $ionicNavBarDelegate.setTitle('');
          } else {
            $ionicNavBarDelegate.setTitle(title);
          }
        } else if (!title) {
          title = $ionicNavBarDelegate.getTitle();
        }
      });
    }]
  };
}])
.factory('TraineeInfo', function () {
    var _trainee = null;
 
    return {
        set: function (trainee) {
            _trainee = trainee;
        },
        get: function () {
            return _trainee;
        }
    };
});