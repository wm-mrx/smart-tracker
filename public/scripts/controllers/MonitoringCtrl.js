var SmartTracker;
(function (SmartTracker) {
    var Controllers;
    (function (Controllers) {
        class MonitoringCtrl {
            constructor($scope, $state, Notification) {
                this.$scope = $scope;
                this.$state = $state;
                this.clients = [];
                this.positions = [];
                this.createMap(-6.24771, 106.9353617);
                this.socket = io.connect(SmartTracker.socketUrl);
                this.socket.emit('set clients', null);
                this.socket.on('get clients', (data) => {
                    $scope.$apply(() => {
                        this.onGetClients(data);
                        for (var i = 0; i < this.clients.length; i++)
                            this.socket.emit('set latest position', this.clients[i].device.serial);
                    });
                });
                this.socket.on('update position', (data) => {
                    $scope.$apply(() => {
                        this.onUpdatePosition(data);
                    });
                });
                this.socket.on('update client', (data) => {
                    $scope.$apply(() => {
                        this.onUpdateClient(data);
                        this.socket.emit('set latest position', data.device.serial);
                    });
                });
                this.socket.on('notify', (data) => {
                    $scope.$apply(() => {
                        var client = this.getClient(this.clients, data.clientId);
                        if (client)
                            Notification.success('Notification from: ' + client.device.serial + ' ' + data.message);
                    });
                });
            }
            onGetClients(data) {
                this.clients = data;
            }
            onUpdatePosition(data) {
                var newPosition = new SmartTracker.Models.Position(data);
                var exisitingPosition = this.getPosition(this.positions, newPosition.clientId);
                if (!exisitingPosition) {
                    var marker = this.createMarker(newPosition.latitude, newPosition.longitude);
                    var popup = '<p>' + newPosition.client.firstName + ' ' + newPosition.client.lastName + '</p>';
                    marker.bindPopup(popup, { zoomAnimation: true });
                    newPosition.marker = marker.addTo(this.map);
                    newPosition.marker.openPopup();
                    this.positions.push(newPosition);
                    return;
                }
                exisitingPosition = newPosition;
                exisitingPosition.marker.setLatLng([newPosition.latitude, newPosition.longitude]);
            }
            onUpdateClient(data) {
                var newClient = new SmartTracker.Models.Client(data);
                var existingClient = this.getClient(this.clients, newClient.id);
                if (!existingClient)
                    this.clients.push(newClient);
            }
            getClient(clients, clientId) {
                return clients.filter(e => e.id == clientId)[0];
            }
            getPosition(positions, clientId) {
                return positions.filter(e => e.clientId == clientId)[0];
            }
            createMarker(latitude, longitude) {
                return L.marker([latitude, longitude]);
            }
            createMap(latCenter, lngCenter) {
                var control = L.control.layers({ "Osm": SmartTracker.osm, "Satellite": SmartTracker.satellite });
                this.map = L.map('map', { center: L.latLng(latCenter, lngCenter), zoom: 12, zoomControl: false });
                this.map.addControl(control);
                SmartTracker.osm.addTo(this.map);
            }
        }
        MonitoringCtrl.$inject = ['$scope', '$state', 'Notification'];
        SmartTracker.smartTracker.controller('MonitoringCtrl', MonitoringCtrl);
    })(Controllers = SmartTracker.Controllers || (SmartTracker.Controllers = {}));
})(SmartTracker || (SmartTracker = {}));
//# sourceMappingURL=MonitoringCtrl.js.map