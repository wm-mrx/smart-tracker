module SmartTracker.Controllers {
    class ClientCtrl {
        static $inject = ['$scope', '$state', 'Notification'];

        constructor(public $scope, public $state, public Notification) {
            
        }
    }

    smartTracker.controller('ClientCtrl', ClientCtrl);
}