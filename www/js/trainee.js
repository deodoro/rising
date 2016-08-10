starter.controller("SearchCtrl", function($scope, $db, $rootScope) {
    $scope.trainees = $db.trainees();
}).controller("ReadCtrl", function($scope, $http) {
    console.log("Read");
}).controller("TraineeInfoCtrl", function($scope, $db, $stateParams) {
    $scope.trainee = $db.traineeById($stateParams.id);
    console.dir($scope.trainee);
});
