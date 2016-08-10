starter.controller("CheckoutCtrl", function($scope, $http, TraineeInfo, ItemInfo, _) {
    $scope.checkout = {
        'trainee': null,
        'equipment': [],
        'notes': null,
        'selectedEquipment': null
    };
    TraineeInfo.set(null);
    $scope.$on("$ionicView.enter", function(){
      if ($scope.checkout.trainee != TraineeInfo.get())
        $scope.checkout.trainee = TraineeInfo.get();
      if (ItemInfo.get() != null && $scope.checkout.selectedEquipment != ItemInfo.get()) {
        $scope.checkout.equipment.push(ItemInfo.get());
        ItemInfo.setSelected(_.map($scope.checkout.equipment, function(i) { return i.id; }));
      }
    });
    $scope.removeItem = function(item) {
       $scope.checkout.equipment = _.reject($scope.checkout.equipment, {id: item.id});
       ItemInfo.setSelected(_.map($scope.checkout.equipment, function(i) { return i.id; }));
    };
}).controller("CheckinCtrl", function($scope, $http, TraineeInfo, ItemInfo, _) {
    $scope.checkin = {
        'trainee': null,
        'equipment': [],
        'notes': null,
        'selectedEquipment': null
    };
    TraineeInfo.set(null);
    $scope.$on("$ionicView.enter", function(){
      if ($scope.checkin.trainee != TraineeInfo.get())
        $scope.checkin.trainee = TraineeInfo.get();
      if (ItemInfo.get() != null && $scope.checkin.selectedEquipment != ItemInfo.get()) {
        $scope.checkin.equipment.push(ItemInfo.get());
        ItemInfo.setSelected(_.map($scope.checkin.equipment, function(i) { return i.id; }));
      }
    });
    $scope.removeItem = function(item) {
       $scope.checkin.equipment = _.reject($scope.checkin.equipment, {id: item.id});
       ItemInfo.setSelected(_.map($scope.checkin.equipment, function(i) { return i.id; }));
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
        $scope.equipment = _.reject($db.checkedOutEquipment(), function(i) { return _.includes(ItemInfo.getSelected(), i.id); });
    }
    else {
        $scope.equipment = _.reject($db.availableEquipment(), function(i) { return _.includes(ItemInfo.getSelected(), i.id); });
    }
    ItemInfo.set(null);
    $scope.clickEquipment = function(equipment) {
        ItemInfo.set(equipment);
        $rootScope.$ionicGoBack();
    };
}).controller("StatusItemCtrl", function($scope, $db, $stateParams) {
    $scope.item = $db.equipmentById($stateParams.id);

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