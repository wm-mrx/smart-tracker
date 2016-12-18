module SmartTracker.Controllers {
    class MonitoringCtrl {
        static $inject = ['$scope', '$state', 'principal'];

        constructor(public $scope, public $state, public principal) {
            principal.identity().then((identity) => {
                $scope.identity = identity;
            });
        }
    }

    smartTracker.controller('MonitoringCtrl', MonitoringCtrl);
}