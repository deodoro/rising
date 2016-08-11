starter.controller("SearchCtrl", function($scope, $db, $rootScope, $state, nfcService) {
    $scope.trainees = $db.trainees();
    $scope.$on("tag", function(event, data) {
        var lookup = $db.traineeByTagId(data.id);
        if (lookup != null)
            $state.go("app.trainee_info", {id: lookup.id});
    });    
}).controller("TraineeInfoCtrl", function($scope, $db, $stateParams) {
    $scope.trainee = $db.traineeById($stateParams.id);
    $scope.equipment = $db.equipmentWith($stateParams.id);
    $scope.history = $db.historyByTrainee($stateParams.id);
});
