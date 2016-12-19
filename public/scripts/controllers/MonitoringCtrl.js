var SmartTracker;
(function (SmartTracker) {
    var Controllers;
    (function (Controllers) {
        class MonitoringCtrl {
            constructor($scope, $state, principal) {
                this.$scope = $scope;
                this.$state = $state;
                this.principal = principal;
                this.markers = [];
                this.logs = [];
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
                    this.clients = [];
                    scope.$apply(() => {
                        var clients = data;
                        clients.forEach(client => {
                            this.clients.push(client);
                            socket.emit('set latest position', client.device.serial);
                        });
                    });
                });
                socket.on('get latest position', (data) => {
                    scope.$apply(() => {
                        var position = new SmartTracker.Models.Position(data);
                        var existingMarker = this.markers.filter(e => e['clientId'] == position.clientId)[0];
                        var existingLog = this.logs.filter(e => e['clientId'] == position.clientId)[0];
                        if (!existingMarker) {
                            var marker = this.createMarker(position.latitude, position.longitude);
                            marker.bindPopup('<p>' + position.client.firstName + ' ' + position.client.lastName + '</p>', { autoClose: false }).addTo(this.map);
                            this.markers.push(marker);
                            this.logs.push(position);
                            return;
                        }
                        existingLog = position;
                        existingMarker.setLatLng([position.latitude, position.longitude]);
                    });
                });
                socket.on('update position', (data) => {
                });
                socket.on('update client', (data) => {
                    scope.$apply(() => {
                        var client = new SmartTracker.Models.Client(data);
                        var existingClient = this.clients.filter(e => e.id == client.id)[0];
                        if (!existingClient)
                            this.clients.push(client);
                        socket.emit('set latest position', client.device.serial);
                    });
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