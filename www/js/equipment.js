starter.controller("CheckoutCtrl", function($scope, $http, $db, $rootScope, $auth, TraineeInfo, ItemInfo, _, nfcService) {

    $scope.checkout = {
        'trainee': null,
        'equipment': [],
        'notes': null,
        'selectedEquipment': null
    };
    $scope.receipt = false;
    TraineeInfo.clear();
    ItemInfo.clear();
    $scope.$on("tag", function(event, data) {
        if ($scope.checkout.trainee == null || data.id != $scope.checkout.trainee.tag_id) {
            $db.traineeByTagId(data.id).then(function(lookup) {
                if (lookup != null) 
                    $scope.checkout.trainee = lookup;
            });
        }
    });
    $scope.$on("$ionicView.enter", function(){
      if (TraineeInfo.get() != null && $scope.checkout.trainee != TraineeInfo.get()) {
        $scope.checkout.trainee = TraineeInfo.get();
        TraineeInfo.clear();        
      }
      if (ItemInfo.get() != null && $scope.checkout.selectedEquipment != ItemInfo.get()) {
        $scope.checkout.equipment.push(ItemInfo.get());
        ItemInfo.clear();
        ItemInfo.setSelected(_.map($scope.checkout.equipment, function(i) { return i.id; }));
      }
    });
    $scope.removeItem = function(item) {
       $scope.checkout.equipment = _.reject($scope.checkout.equipment, {id: item.id});
       ItemInfo.clear();
       ItemInfo.setSelected(_.map($scope.checkout.equipment, function(i) { return i.id; }));
    };
    $scope.commit = function() {
        $scope.checkout.date = new Date();
        $db.createCheckout($scope.checkout, $auth.username());
        $scope.receipt = true;
    };
    $scope.goBack = function() {
        $rootScope.$ionicGoBack();
    };
}).controller("CheckinCtrl", function($scope, $http, $db, $rootScope, $auth, TraineeInfo, ItemInfo, _) {
    $scope.checkin = {
        'trainee': null,
        'equipment': [],
        'notes': null,
        'selectedEquipment': null
    };
    $scope.receipt = false;
    TraineeInfo.clear();
    ItemInfo.clear();
    $scope.$on("$ionicView.enter", function(){
      if (TraineeInfo.get() != null && $scope.checkin.trainee != TraineeInfo.get()) {
        $scope.checkin.trainee = TraineeInfo.get();
        $db.equipmentWith(TraineeInfo.get().id).then(function(e) {
            $scope.checkin.equipment = e;
            TraineeInfo.clear();
            ItemInfo.clear();
            ItemInfo.setSelected(_.map($scope.checkin.equipment, function(i) { return i.id; }));
        });
      }
      if (ItemInfo.get() != null) {
        $scope.checkin.equipment.push(ItemInfo.get());
        if ($scope.checkin.trainee == null) {
            $db.traineeById(ItemInfo.get().trainee).then(function(trainee) {
                $scope.checkin.trainee = trainee;
                $db.equipmentWith(trainee.id).then(function(e) {
                    $scope.checkin.max_equipment_length = e.length;
                });
            });
        }
        ItemInfo.clear();
        ItemInfo.setSelected(_.map($scope.checkin.equipment, function(i) { return i.id; }));
      }
    });
    $scope.$on("tag", function(event, data) {
        if ($scope.checkin.trainee == null || data.id != $scope.checkin.trainee.tag_id) {
            $db.traineeByTagId(data.id).then(function(lookup) {
                if (lookup != null) {
                    $scope.checkin.trainee = lookup;
                    $db.equipmentWith(lookup.id).then(function(e) {
                        $scope.checkin.max_equipment_length = e.length;
                        $scope.checkin.equipment = e;
                        ItemInfo.clear();
                        ItemInfo.setSelected(_.map($scope.checkin.equipment, function(i) { return i.id; }));
                    })
                }
            });
        }
    });
    $scope.removeItem = function(item) {
       $scope.checkin.equipment = _.reject($scope.checkin.equipment, {id: item.id});
       ItemInfo.clear();
       ItemInfo.setSelected(_.map($scope.checkin.equipment, function(i) { return i.id; }));
    };
    $scope.getTraineeId = function() {
       if ($scope.checkin.trainee != null)
          return $scope.checkin.trainee.id;
       else
          return "all";
    };
    $scope.addSelection = function() {
      return $scope.checkin.trainee == null || $scope.checkin.equipment.length < $scope.checkin.max_equipment_length;
    };
    $scope.commit = function() {
        $scope.checkin.date = new Date();
        $db.createCheckin($scope.checkin, $auth.username());
        $scope.receipt = true;
    };    
    $scope.goBack = function() {
        $rootScope.$ionicGoBack();
    };
}).controller("LookupCtrl", function($scope, $http, $db, $timeout) {
    var promise = null;
    $scope.search = { term: ""};
    $db.allEquipment().then(function(data) {
        $scope.equipment = data;
    });
    $scope.clearSearch = function() {
        console.log("clear");
        $scope.search.term = "";
    }
    $scope.$watch("search.term", function(newValue, oldValue) {
        if (promise != null) 
            $timeout.cancel(promise);
        promise = $timeout(function() {
            $db.allEquipment().then(function(data) {                
                $scope.equipment = _.filter(data, function(i) { return _.includes(i.description.toUpperCase(), $scope.search.term.toUpperCase()); });
            });
            promise = null;
        }, 300);
    });
}).controller("FindTraineeCtrl", function($scope, $rootScope, $db, TraineeInfo) {
    $db.trainees().then(function(data) {
        $scope.trainees = data;
    });
    $scope.clickTrainee = function(trainee) {
        TraineeInfo.set(trainee);
        $rootScope.$ionicGoBack();
    };
    $scope.$on("tag", function(event, data) {
        $db.traineeByTagId(data.id).then(function(lookup) {
            if (lookup != null) {
                TraineeInfo.set(lookup);
                $rootScope.$ionicGoBack();
            }
        });
    });    
}).controller("AddItemCtrl", function($scope, $rootScope, $stateParams, $db, ItemInfo, _) {
    if ($stateParams.dir == "in") {
        var equipment = [];
        if ($stateParams.trainee == "all")
            $db.checkedOutEquipment().then(function(data) { equipment = data; });
        else
            $db.equipmentWith($stateParams.trainee).then(function(data) { equipment = data; });
        $scope.equipment = _.reject(equipment, function(i) { return _.includes(ItemInfo.getSelected(), i.id); });
    }
    else {
        $db.availableEquipment().then(function(data) {
            $scope.equipment = _.reject(data, function(i) { return _.includes(ItemInfo.getSelected(), i.id); });
        });
    }
    $scope.clickEquipment = function(equipment) {
        ItemInfo.set(equipment);
        $rootScope.$ionicGoBack();
    };
}).controller("StatusItemCtrl", function($scope, $db, $stateParams) {
    $db.equipmentById($stateParams.id).then(function(item) {
        $scope.item = item;
    });
}).controller("HistoryCtrl", function($scope, $http, $db, $rootScope, $auth, TraineeInfo, ItemInfo, _) {
    $db.history().then(function(data) {
        $scope.history = data;
    });
});


// starter.controller("equipment", function($scope, $cordovaBarcodeScanner) {
 //    $scope.results = "not run";
 
 //    $scope.scanBarcode = function() {
 //        $scope.results = "running";
 //        $cordovaBarcodeScanner.scan().then(function(imageData) {
 //            $scope.results = "format: " + imageData.format;
 //        }, function(error) {
 //            $scope.results = "An error happened -> " + error;
 //        });
 //    };
 // 