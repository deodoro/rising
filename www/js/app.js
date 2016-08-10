// Ionic Starter App

/* Make lodash an injectable service */
angular.module('lodash', [])  
.factory('_', ['$window', function($window) {
    return $window._; // assumes underscore has already been loaded on the page
}]);

var starter = angular.module('starter', ['ionic', 'ngCordova', 'lodash']);

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
    .state('app.history', {
      url: "/equipment/history",
      views: {
        'equipment-tab': {
          templateUrl: "templates/history.html",
          controller: "HistoryCtrl"
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
    })
    .state('app.add_item_out', {
      url: "/add_item/:dir",
      views: {
        'equipment-tab': {
          templateUrl: "templates/add_item.html",
          controller: "AddItemCtrl"
        }
      }
    })
    .state('app.add_item_in', {
      url: "/add_item/:dir/:trainee",
      views: {
        'equipment-tab': {
          templateUrl: "templates/add_item.html",
          controller: "AddItemCtrl"
        }
      }
    })
    .state('app.item_status', {
      url: "/item_status/:id",
      views: {
        'equipment-tab': {
          templateUrl: "templates/item_status.html",
          controller: "StatusItemCtrl"
        }
      }
    })
    .state('app.trainee_info', {
      url: "/trainee_info/:id",
      views: {
        'trainee-tab': {
          templateUrl: "templates/trainee_info.html",
          controller: "TraineeInfoCtrl"
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
.factory('TraineeInfo', function () {
    var _trainee = null;
 
    return {
        set: function (trainee) {
            _trainee = trainee;
        },
        get: function () {
            return _trainee;
        },
        clear: function() {
          _trainee = null;
        }
    };
})
.factory('ItemInfo', function () {
    var _item = null;
    var _sel_items = null;
 
    return {
        set: function (item) {
            _item = item;
        },
        get: function () {
            return _item;
        },
        setSelected: function(items) {
           _sel_items = items;
        },
        getSelected: function() {
          return _sel_items;
        },
        clear: function() {
          _item = null;
          _sel_items = null;          
        }
    };
})
.factory("$db", function() {
   var trainees = [{ "id": 0, "fullname": "Johnny Ng", "tag": "yellow" }, { "id": 1, "fullname": "Ross Lee", "tag": "red" }, { "id": 2, "fullname": "Jose de Oliveira", "tag": "green" }];
   var equipment = [{ "id": 0, "description": "E 1", status: "in" }, { "id": 1, "description": "E 2", status: "in" }, { "id": 2, "description": "E 3", status: "in" }, { "id": 3, "description": "E 4", status: "out", trainee: trainees[0], history: [{date: new Date(), record_type: "checked out", trainee: trainees[0], employee: "test"}]}, { "id": 4, "description": "E 5", status: "out", trainee: trainees[0] }, { "id": 5, "description": "E 6", status: "out", trainee: trainees[1] }];
   var history = [{date: new Date(), record_type: "check out", trainee: trainees[0], employee: "test", equipment: [equipment[0]]}, {date: new Date(), record_type: "check in", trainee: trainees[0], employee: "test", equipment: [equipment[0]]}];

   return {
      allEquipment: function() {
        return equipment;
      },
      availableEquipment: function() {
        return _.filter(equipment, function(i) { return i.status == "in"; });
      },
      checkedOutEquipment: function() {
        return _.filter(equipment, function(i) { return i.status == "out"; });
      },
      equipmentById: function(id) {
        return _.find(equipment, function(i) { return i.id == id; })
      },
      history: function() {
        return history;
      },
      historyByTrainee: function(trainee_id) {
        return _.filter(history, function(i) { return i.trainee.id == trainee_id; });
      },
      trainees: function() {
        return trainees;
      },
      traineeById: function(id) {
        return _.find(trainees, function(i) { return i.id == id; });
      }, 
      equipmentWith: function(trainee_id) {
        return _.filter(equipment, function(i) { return i.trainee && i.trainee.id == trainee_id; }) || [];
      },
      createCheckout: function(checkout, username) {
        checkout.equipment.forEach(function(i) {
          i.status = "out";
          i.history = i.history || [];
          i.trainee = checkout.trainee;
          i.history.push({ date: checkout.date, record_type: "checked out", trainee: checkout.trainee, employee: username });
        });        
        history.push({ record_type: "check out", date: checkout.date, notes: checkout.notes, equipment: checkout.equipment, trainee: checkout.trainee, employee: username })
      },
      createCheckin: function(checkin, username) {
        checkin.equipment.forEach(function(i) {
          i.status = "in";
          i.history = i.history || [];
          i.trainee = null;
          i.history.push({ date: checkin.date, record_type: "checked in", trainee: checkin.trainee, employee: username });
          history.push({ record_type: "check in", date: checkin.date, notes: checkin.notes, equipment: checkin.equipment, trainee: checkin.trainee, employee: username })
        });        
      }
   }
})
.factory("$auth", function() {
  return {
    username: function() {
      return "Johnny Ng";
    }
  };
});