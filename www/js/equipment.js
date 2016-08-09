starter.controller("CheckoutCtrl", function($scope, $http, TraineeInfo) {
    $scope.checkout = {
        'trainee': null,
        'equipment': [],
        'notes': null
    };
    TraineeInfo.set(null);
    console.log("Checkout");
    $scope.$on("selectedTrainee", function() {
        console.log("selected");
        // $scope.checkout.trainee = trainee;
    });
    $scope.$on("$ionicView.enter", function(){
      if ($scope.checkout.trainee != TraineeInfo.get())
        $scope.checkout.trainee = TraineeInfo.get();
    });
}).controller("CheckinCtrl", function($scope, $http) {
    console.log("Checkin");
}).controller("LookupCtrl", function($scope, $http) {
    console.log("Lookup");
}).controller("FindTraineeCtrl", function($scope, $rootScope, TraineeInfo) {
    $scope.trainees = [{ "id": 0, "fullname": "A 1" }, { "id": 1, "fullname": "A 2" }, { "id": 2, "fullname": "A 3" }];

    $scope.clickTrainee = function(trainee) {
        TraineeInfo.set(trainee);
        $rootScope.$broadcast("selectedTrainee", trainee);
        $rootScope.$ionicGoBack();
    };
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