starter.controller("CheckoutCtrl", function($scope, $http) {
    console.log("Checkout");
}).controller("CheckinCtrl", function($scope, $http) {
    console.log("Checkin");
}).controller("LookupCtrl", function($scope, $http) {
    console.log("Lookup");
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