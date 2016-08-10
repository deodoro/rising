starter.controller("LoginCtrl", function($scope, $http) {
    console.log("Login");
}).controller("LogoutCtrl", function($scope, $http) {
    console.log("Logout");
}).controller("PatrolCtrl", function($scope, $http) {
    $scope.employee = {records: [{ date: "08/08/2016", location: "test"}]};
});

