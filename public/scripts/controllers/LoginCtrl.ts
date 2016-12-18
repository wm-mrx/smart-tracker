module SmartTracker.Controllers {
    class LoginCtrl {
        user: any = {};

        static $inject = ['$scope', '$state', '$location', 'principal', 'Notification'];

        constructor(public $scope, public $state, public $location, public principal, public Notification) { }

        login(): void {
            var principal = this.principal;
            var scope = this.$scope;
            var state = this.$state;
            var location = this.$location;
            var notification = this.Notification;

            Services.User.Login(this.user).then(response => {
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

        logout(): void {
            Services.User.Logout();
            this.principal.authenticate(null);
            this.$state.go('site.login');
        }
    }

    smartTracker.controller('LoginCtrl', LoginCtrl);
}