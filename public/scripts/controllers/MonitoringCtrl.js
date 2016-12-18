var SmartTracker;
(function (SmartTracker) {
    var Controllers;
    (function (Controllers) {
        class MonitoringCtrl {
            constructor($scope, $state, principal) {
                this.$scope = $scope;
                this.$state = $state;
                this.principal = principal;
                this.clients = [];
                principal.identity().then((identity) => {
                    var socket = io.connect(SmartTracker.socketUrl);
                    socket.emit('set clients', null);
                    socket.on('update position', (data) => {
                        var client = this.clients.filter(e => e.deviceId === data.deviceId)[0];
                        if (!client)
                            return;
                        console.log(data);
                    });
                    socket.on('get clients', (clients) => {
                        $scope.$apply(() => {
                            for (var i = 0; i < clients.length; i++) {
                                var client = new SmartTracker.Models.Client(clients[i]);
                                var existingClient = this.clients.filter(e => e.id === client.id)[0];
                                if (!existingClient) {
                                    socket.emit('set latest position', client.device.serial);
                                    this.clients.push(client);
                                }
                            }
                        });
                    });
                    socket.on('get latest position', (data) => {
                        var client = this.clients.filter(e => e.deviceId === data.deviceId)[0];
                        if (!client)
                            return;
                        console.log(data);
                    });
                    socket.on('update client', (data) => {
                        $scope.$apply(() => {
                            var client = new SmartTracker.Models.Client(data);
                            var existingClient = this.clients.filter(e => e.id === client.id)[0];
                            if (!existingClient) {
                                socket.emit('set latest position', client.device.serial);
                                this.clients.push(client);
                            }
                        });
                    });
                });
            }
        }
        MonitoringCtrl.$inject = ['$scope', '$state', 'principal'];
        SmartTracker.smartTracker.controller('MonitoringCtrl', MonitoringCtrl);
    })(Controllers = SmartTracker.Controllers || (SmartTracker.Controllers = {}));
})(SmartTracker || (SmartTracker = {}));
//# sourceMappingURL=MonitoringCtrl.js.map