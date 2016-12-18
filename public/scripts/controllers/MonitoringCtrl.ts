module SmartTracker.Controllers {
    declare var io: { connect(url: string): Socket; }

    interface Socket {
        on(event: string, callback: (data: any) => void);
        emit(event: string, data: any);
    }

    class MonitoringCtrl {
        clients: Models.IClient[];

        static $inject = ['$scope', '$state', 'principal'];

        constructor(public $scope, public $state, public principal) {
            this.clients = [];

            principal.identity().then((identity) => {
                var socket = io.connect(socketUrl);

                socket.emit('set clients', null);

                socket.on('update position', (data) => {

                });

                socket.on('get clients', (clients) => {
                    $scope.$apply(() => {
                        for (var i = 0; i < clients.length; i++) {
                            var client = new Models.Client(clients[i]);
                            var existingClient = this.clients.filter(e => e.id === client.id)[0];

                            if (!existingClient)
                                this.clients.push(client);
                        }
                    });
                });

                socket.on('update client', (data) => {
                    $scope.$apply(() => {
                        var client = new Models.Client(data);
                        var existingClient = this.clients.filter(e => e.id === client.id)[0];

                        if (!existingClient)
                            this.clients.push(client);
                    });
                });
            });
        }
    }

    smartTracker.controller('MonitoringCtrl', MonitoringCtrl);
}