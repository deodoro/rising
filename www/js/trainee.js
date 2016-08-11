starter.controller("SearchCtrl", function($scope, $db, $rootScope, $state, $timeout, nfcService) {
    var promise = null;
    var all_trainees = null;
    $scope.search = { term: "" };
    $db.trainees().then(function(data) {
        all_trainees = data;
        $scope.trainees = data;
    });
    $scope.clearSearch = function() {
        $scope.search.term = "";
    }
    $scope.$watch("search.term", function(newValue, oldValue) {
        if (promise != null) 
            $timeout.cancel(promise);
        if ($scope.search.term == "")
            $scope.trainees = all_trainees;
        else 
            promise = $timeout(function() {
                $scope.trainees = _.filter(all_trainees, function(i) { return _.includes(i.fullname.toUpperCase(), $scope.search.term.toUpperCase()); });
                promise = null;
            }, 300);
    });
    $scope.$on("tag", function(event, data) {
        $db.traineeByTagId(data.id).then(function(lookup) {
            if (lookup != null)
                $state.go("app.trainee_info", {id: lookup.id});
        });
    });    
}).controller("TraineeInfoCtrl", function($scope, $db, $stateParams) {
    $db.traineeById($stateParams.id).then(function(data) {
        $scope.trainee = data;
    });
    $db.equipmentWith($stateParams.id).then(function(data) {
        $scope.equipment = data;
    });
    $db.historyByTrainee($stateParams.id).then(function(data) {
        $scope.history = data;
    });
});
