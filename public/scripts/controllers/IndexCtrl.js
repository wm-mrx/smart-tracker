var SmartTracker;
(function (SmartTracker) {
    var Controllers;
    (function (Controllers) {
        class IndexCtrl {
            constructor($scope, $state, principal) {
                this.$scope = $scope;
                this.$state = $state;
                this.principal = principal;
                $scope.principal = principal;
                principal.identity().then((identity) => {
                    $scope.identity = identity;
                });
                $scope.$state = $state;
            }
        }
        IndexCtrl.$inject = ['$scope', '$state', 'principal'];
        SmartTracker.smartTracker.controller('IndexCtrl', IndexCtrl);
    })(Controllers = SmartTracker.Controllers || (SmartTracker.Controllers = {}));
})(SmartTracker || (SmartTracker = {}));
//# sourceMappingURL=IndexCtrl.js.map