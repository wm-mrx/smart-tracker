var SmartTracker;
(function (SmartTracker) {
    var Controllers;
    (function (Controllers) {
        class ClientCtrl {
            constructor($scope, $state, Notification) {
                this.$scope = $scope;
                this.$state = $state;
                this.Notification = Notification;
            }
        }
        ClientCtrl.$inject = ['$scope', '$state', 'Notification'];
        SmartTracker.smartTracker.controller('ClientCtrl', ClientCtrl);
    })(Controllers = SmartTracker.Controllers || (SmartTracker.Controllers = {}));
})(SmartTracker || (SmartTracker = {}));
//# sourceMappingURL=ClientCtrl.js.map