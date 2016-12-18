var SmartTracker;
(function (SmartTracker) {
    var Controllers;
    (function (Controllers) {
        class LoginCtrl {
            constructor($scope, $state, $location, principal, Notification) {
                this.$scope = $scope;
                this.$state = $state;
                this.$location = $location;
                this.principal = principal;
                this.Notification = Notification;
                this.user = {};
            }
            login() {
                var principal = this.principal;
                var scope = this.$scope;
                var state = this.$state;
                var location = this.$location;
                var notification = this.Notification;
                SmartTracker.Services.User.Login(this.user).then(response => {
                    principal.authenticate(response.data);
                    var params = location.search();
                    if (params.redir)
                        window.location.href = window.location.protocol + "//" + window.location.host + params.redir;
                    else if (scope.returnToState)
                        state.go(scope.returnToState.name, scope.returnToStateParams);
                    else
                        state.go('site.main');
                }).catch(exception => {
                    notification.error(exception.data);
                });
            }
            logout() {
                SmartTracker.Services.User.Logout();
                this.principal.authenticate(null);
                this.$state.go('site.login');
            }
        }
        LoginCtrl.$inject = ['$scope', '$state', '$location', 'principal', 'Notification'];
        SmartTracker.smartTracker.controller('LoginCtrl', LoginCtrl);
    })(Controllers = SmartTracker.Controllers || (SmartTracker.Controllers = {}));
})(SmartTracker || (SmartTracker = {}));
//# sourceMappingURL=LoginCtrl.js.map