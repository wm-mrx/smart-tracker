var SmartTracker;
(function (SmartTracker) {
    var Controllers;
    (function (Controllers) {
        class MonitoringCtrl {
            constructor($scope, $state, principal) {
                this.$scope = $scope;
                this.$state = $state;
                this.principal = principal;
                this.osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                });
                this.satellite = L.tileLayer('https://api.mapbox.com/styles/v1/vampire13/civxpqmqe006z2jo5r3ata02a/tiles/256/{z}/{x}/{y}?access_token={apiKey}', {
                    user: 'vampire13',
                    apiKey: 'pk.eyJ1IjoidmFtcGlyZTEzIiwiYSI6ImNpdnhwa3M2azAyZHMydHRheHN4NDF6dXAifQ.inowv5XJuorxQA_fsWxciQ',
                    mapId: 'mapbox.mapbox-streets-v7'
                });
                this.clients = [];
                this.markers = [];
                this.dataTables = [];
                principal.identity().then((identity) => {
                    this.initMap();
                    var socket = io.connect(SmartTracker.socketUrl);
                    socket.emit('set clients', null);
                    socket.on('update position', (data) => {
                        var client = this.clients.filter(e => e.deviceId == data.deviceId)[0];
                        if (!client)
                            return;
                        console.log(data);
                    });
                    socket.on('get clients', (clients) => {
                        $scope.$apply(() => {
                            for (var i = 0; i < clients.length; i++) {
                                var client = new SmartTracker.Models.Client(clients[i]);
                                var existingClient = this.clients.filter(e => e.id == client.id)[0];
                                if (!existingClient) {
                                    socket.emit('set latest position', client.device.serial);
                                    this.clients.push(client);
                                }
                            }
                        });
                    });
                    socket.on('get latest position', (data) => {
                        $scope.$apply(() => {
                            var position = new SmartTracker.Models.Position(data);
                            var client = this.clients.filter(e => e.id == position.clientId)[0];
                            var latlng = L.latLng(position.latitude, position.longitude);
                            var existingMarker = this.markers.filter(e => e['client'].id == client.id)[0];
                            this.dataTables.push(position);
                            if (!existingMarker) {
                                var fullName = client.firstName + ' ' + client.lastName;
                                var marker = L.marker(latlng);
                                marker['client'] = client;
                                marker['position'] = position;
                                marker.addTo(this.map);
                                this.markers.push(marker);
                                return;
                            }
                            existingMarker.setLatLng(latlng);
                            existingMarker['position'] = position;
                        });
                    });
                    socket.on('update client', (data) => {
                        $scope.$apply(() => {
                            var client = new SmartTracker.Models.Client(data);
                            var existingClient = this.clients.filter(e => e.id == client.id)[0];
                            if (!existingClient) {
                                socket.emit('set latest position', client.device.serial);
                                this.clients.push(client);
                            }
                        });
                    });
                });
            }
            initMap() {
                this.map = L.map('map', { center: L.latLng(-6.24771, 106.9353617), zoom: 12, zoomControl: false });
                L.control.layers({ "Osm": this.osm, "Satellite": this.satellite }).addTo(this.map);
                this.osm.addTo(this.map);
            }
        }
        MonitoringCtrl.$inject = ['$scope', '$state', 'principal'];
        SmartTracker.smartTracker.controller('MonitoringCtrl', MonitoringCtrl);
    })(Controllers = SmartTracker.Controllers || (SmartTracker.Controllers = {}));
})(SmartTracker || (SmartTracker = {}));
//# sourceMappingURL=MonitoringCtrl.js.map