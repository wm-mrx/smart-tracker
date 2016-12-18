module SmartTracker.Controllers {
    declare var io: { connect(url: string): Socket; }

    interface Socket {
        on(event: string, callback: (data: any) => void);
        emit(event: string, data: any);
    }

    class MonitoringCtrl {
        static $inject = ['$scope', '$state', 'principal'];

        constructor(public $scope, public $state, public principal) {
            principal.identity().then((identity) => {
                var socket = io.connect(socketUrl);

                socket.on('update position', (data) => {

                });
            });
        }
    }

    smartTracker.controller('MonitoringCtrl', MonitoringCtrl);
}