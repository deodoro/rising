starter.controller("SearchCtrl", function($scope, $db, $rootScope, $state, $timeout, nfcService) {
    var promise = null;
    $scope.search = { term: "" };
    $db.trainees().then(function(data) {
        $scope.trainees = data;
    });
    $scope.clearSearch = function() {
        console.log("clear");
        $scope.search.term = "";
    }
    $scope.$watch("search.term", function(newValue, oldValue) {
        if (promise != null) 
            $timeout.cancel(promise);
        promise = $timeout(function() {
            $db.trainees().then(function(data) {
                $scope.trainees = _.filter(data, function(i) { return _.includes(i.fullname.toUpperCase(), $scope.search.term.toUpperCase()); });
            });
            promise = null;
        }, 300);
    });
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
