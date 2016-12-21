var SmartTracker;
(function (SmartTracker) {
    SmartTracker.smartTracker = angular.module('smartTracker', ['ui.router', 'angular-loading-bar', 'ui-notification', 'ui.bootstrap', 'bw.paging']);
    var principal = ($q, $http, $timeout) => {
        var _identity = undefined;
        var _authenticated = false;
        return {
            isIdentityResolved: () => {
                return angular.isDefined(_identity);
            },
            isAuthenticated: () => {
                return _authenticated;
            },
            authenticate: (identity) => {
                _identity = identity;
                _authenticated = identity != null;
            },
            identity: (force) => {
                var deferred = $q.defer();
                if (force === true)
                    _identity = undefined;
                if (angular.isDefined(_identity)) {
                    deferred.resolve(_identity);
                    return deferred.promise;
                }
                $http.get(SmartTracker.service + 'user/getIdentity').then((response) => {
                    if (response.data) {
                        _identity = response.data;
                        _authenticated = true;
                    }
                    deferred.resolve(_identity);
                }).catch(() => {
                    _identity = null;
                    _authenticated = false;
                    deferred.resolve(_identity);
                });
                return deferred.promise;
            }
        };
    };
    SmartTracker.smartTracker.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
        ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) => {
            $urlRouterProvider.otherwise(SmartTracker.root);
            $locationProvider.html5Mode({ enabled: true });
            $httpProvider.interceptors.push('responseObserver');
            $stateProvider.state('site', {
                abstract: true,
                template: '<ui-view />',
                resolve: {
                    authorize: ['authorization', (authorization) => {
                            return authorization.authorize();
                        }]
                }
            }).state('site.login', {
                url: SmartTracker.root + '/login',
                templateUrl: SmartTracker.root + '/views/login.html',
                controller: 'LoginCtrl as ctrl'
            }).state('site.main', {
                url: SmartTracker.root,
                templateUrl: SmartTracker.root + '/views/main.html',
                controller: 'IndexCtrl as ctrl'
            }).state('site.main.client', {
                url: '/client',
                templateUrl: SmartTracker.root + '/views/client.html',
                controller: 'ClientCtrl as ctrl'
            }).state('site.main.monitoring', {
                url: '/monitoring',
                templateUrl: SmartTracker.root + '/views/monitoring.html',
                controller: 'MonitoringCtrl as ctrl'
            }).state('site.main.notification', {
                url: '/notification',
                templateUrl: SmartTracker.root + '/views/notification.html',
                controller: 'NotificationCtrl as ctrl'
            }).state('site.main.history', {
                url: '/history',
                templateUrl: SmartTracker.root + '/views/history.html',
                controller: 'HistoryCtrl as ctrl'
            });
        }]);
    var authorization = ($rootScope, $state, $location, principal) => {
        return {
            authorize: () => {
                return principal.identity().then(function () {
                    var isAuthenticated = principal.isAuthenticated();
                    if (!isAuthenticated && $rootScope.toState.name !== 'site.login') {
                        $rootScope.returnToState = $rootScope.toState;
                        $rootScope.returnToStateParams = $rootScope.toStateParams;
                        $state.go('site.login');
                    }
                });
            }
        };
    };
    var run = ($rootScope, $state, $stateParams, authorization, principal, $http) => {
        SmartTracker.http = $http;
        $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
            $rootScope.toState = toState;
            $rootScope.toStateParams = toStateParams;
            if (principal.isIdentityResolved())
                authorization.authorize();
        });
    };
    SmartTracker.smartTracker.factory('responseObserver', ['$q', '$location', function responseObserver($q, $location) {
            return {
                'responseError': function (errorResponse) {
                    switch (errorResponse.status) {
                        case 401:
                            $location.path(SmartTracker.root + '/login');
                            break;
                    }
                    return $q.reject(errorResponse);
                }
            };
        }]);
    SmartTracker.smartTracker.directive('fileModel', ['$parse', function ($parse) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var model = $parse(attrs['fileModel']);
                    var modelSetter = model.assign;
                    element.bind('change', function () {
                        scope.$apply(function () {
                            modelSetter(scope, element[0]['files'][0]);
                        });
                    });
                }
            };
        }]);
    SmartTracker.smartTracker.service('fileUpload', ['$http', function ($http) {
            this.uploadFileToUrl = function (file, uploadUrl) {
                var fd = new FormData();
                fd.append('file', file);
                $http.post(uploadUrl, fd, {
                    transformRequest: angular.identity,
                    headers: { 'Content-Type': undefined }
                }).success(function () { })
                    .error(function () { });
            };
        }]);
    SmartTracker.smartTracker.factory('principal', ['$q', '$http', '$timeout', principal]);
    SmartTracker.smartTracker.factory('authorization', ['$rootScope', '$state', '$location', 'principal', authorization]);
    SmartTracker.smartTracker.run(['$rootScope', '$state', '$stateParams', 'authorization', 'principal', '$http', run]);
})(SmartTracker || (SmartTracker = {}));
//# sourceMappingURL=SmartTracker.js.map