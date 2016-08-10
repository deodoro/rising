starter.controller("SearchCtrl", function($scope, $db, $rootScope) {
    $scope.trainees = $db.trainees();
}).controller("TraineeInfoCtrl", function($scope, $db, $stateParams) {
    $scope.trainee = $db.traineeById($stateParams.id);
    $scope.history = $db.historyByTrainee($stateParams.id);
});
