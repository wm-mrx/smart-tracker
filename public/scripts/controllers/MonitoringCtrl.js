var SmartTracker;
(function (SmartTracker) {
    var Controllers;
    (function (Controllers) {
        class MonitoringCtrl {
            constructor($scope, $state, principal) {
                this.$scope = $scope;
                this.$state = $state;
                this.principal = principal;
                this.clientMarkers = [];
                this.initMap();
                principal.identity().then((identity) => {
                    this.initSocket(identity);
                });
            }
            initSocket(identity) {
                var scope = this.$scope;
                var socket = io.connect(SmartTracker.socketUrl);
                socket.emit('set clients', null);
                socket.on('get clients', (data) => {
                    scope.$apply(() => {
                        var clients = data;
                        clients.forEach(client => {
                            socket.emit('set latest position', client.device.serial);
                        });
                    });
                });
                socket.on('get latest position', (data) => {
                    scope.$apply(() => {
                        var position = new SmartTracker.Models.Position(data);
                        var existingClient = this.clientMarkers.filter(e => e.client.id == position.clientId)[0];
                        if (!existingClient) {
                            var label = position.client.firstName + ' ' + position.client.lastName;
                            var marker = this.createMarker(position.latitude, position.longitude).bindPopup('<p>' + label + '</p>').addTo(this.map);
                            this.clientMarkers.push({ client: position.client, marker: marker });
                        }
                        existingClient.marker.setLatLng([position.latitude, position.longitude]);
                    });
                });
                socket.on('update position', (data) => {
                    var position = new SmartTracker.Models.Position(data);
                    var existingClient = this.clientMarkers.filter(e => e.client.id == position.clientId)[0];
                    if (!existingClient) {
                        var label = position.client.firstName + ' ' + position.client.lastName;
                        var marker = this.createMarker(position.latitude, position.longitude).bindPopup('<p>' + label + '</p>').addTo(this.map);
                        this.clientMarkers.push({ client: position.client, marker: marker });
                    }
                    existingClient.marker.setLatLng([position.latitude, position.longitude]);
                });
                socket.on('update client', (data) => {
                    var client = new SmartTracker.Models.Client(data);
                    socket.emit('set latest position', client.device.serial);
                });
            }
            initMap() {
                var control = L.control.layers({ "Osm": SmartTracker.osm, "Satellite": SmartTracker.satellite });
                this.map = L.map('map', { center: L.latLng(-6.24771, 106.9353617), zoom: 12, zoomControl: false });
                this.map.addControl(control);
                SmartTracker.osm.addTo(this.map);
            }
            createMarker(latitude, longitude) {
                return L.marker([latitude, longitude]);
            }
        }
        MonitoringCtrl.$inject = ['$scope', '$state', 'principal'];
        SmartTracker.smartTracker.controller('MonitoringCtrl', MonitoringCtrl);
    })(Controllers = SmartTracker.Controllers || (SmartTracker.Controllers = {}));
})(SmartTracker || (SmartTracker = {}));
//# sourceMappingURL=MonitoringCtrl.js.map