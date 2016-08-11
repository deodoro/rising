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
        var lookup = $db.traineeByTagId(data.id);
        if (lookup != null && lookup != $scope.checkout.trainee) {
            $scope.$apply(function() {
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
        $scope.checkin.equipment = $db.equipmentWith(TraineeInfo.get().id);
        TraineeInfo.clear();
        ItemInfo.clear();
        ItemInfo.setSelected(_.map($scope.checkin.equipment, function(i) { return i.id; }));
      }
      if (ItemInfo.get() != null) {
        $scope.checkin.equipment.push(ItemInfo.get());
        if ($scope.checkin.trainee == null) 
            $scope.checkin.trainee = ItemInfo.get().trainee;
        ItemInfo.clear();
        ItemInfo.setSelected(_.map($scope.checkin.equipment, function(i) { return i.id; }));
      }
    });
    $scope.$on("tag", function(event, data) {
        var lookup = $db.traineeByTagId(data.id);
        if (lookup != null && lookup != $scope.checkin.trainee) {
            $scope.$apply(function() {
                $scope.checkin.trainee = lookup;
                $scope.checkin.equipment = $db.equipmentWith(lookup.id);
                ItemInfo.clear();
                ItemInfo.setSelected(_.map($scope.checkin.equipment, function(i) { return i.id; }));
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
      return $scope.checkin.trainee == null || $scope.checkin.equipment.length < $db.equipmentWith($scope.checkin.trainee.id).length;
    };
    $scope.commit = function() {
        $scope.checkin.date = new Date();
        $db.createCheckin($scope.checkin, $auth.username());
        $scope.receipt = true;
    };    
    $scope.goBack = function() {
        $rootScope.$ionicGoBack();
    };
}).controller("LookupCtrl", function($scope, $http, $db) {
    $scope.equipment = $db.allEquipment();
}).controller("FindTraineeCtrl", function($scope, $rootScope, $db, TraineeInfo) {
    $scope.trainees = $db.trainees();
    $scope.clickTrainee = function(trainee) {
        TraineeInfo.set(trainee);
        $rootScope.$ionicGoBack();
    };
}).controller("AddItemCtrl", function($scope, $rootScope, $stateParams, $db, ItemInfo, _) {
    if ($stateParams.dir == "in") {
        var equipment = [];
        if ($stateParams.trainee == "all")
            equipment = $db.checkedOutEquipment();
        else
            equipment = $db.equipmentWith($stateParams.trainee);
        $scope.equipment = _.reject(equipment, function(i) { return _.includes(ItemInfo.getSelected(), i.id); });
    }
    else {
        $scope.equipment = _.reject($db.availableEquipment(), function(i) { return _.includes(ItemInfo.getSelected(), i.id); });
    }
    $scope.clickEquipment = function(equipment) {
        ItemInfo.set(equipment);
        $rootScope.$ionicGoBack();
    };
}).controller("StatusItemCtrl", function($scope, $db, $stateParams) {
    $scope.item = $db.equipmentById($stateParams.id);
}).controller("HistoryCtrl", function($scope, $http, $db, $rootScope, $auth, TraineeInfo, ItemInfo, _) {
    $scope.history = $db.history();
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