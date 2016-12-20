module SmartTracker.Controllers {
    class MonitoringCtrl {
        map: L.Map;
        clients: Models.IClient[];
        positions: Models.Position[];

        static $inject = ['$scope', '$state'];

        constructor(public $scope, public $state) {
            this.clients = [];
            this.positions = [];
            this.createMap(-6.24771, 106.9353617);

            var socket = io.connect(socketUrl);

            socket.emit('set clients', null);

            socket.on('get clients', (data) => {
                $scope.$apply(() => {
                    this.onGetClients(data);

                    for (var i = 0; i < this.clients.length; i++)
                        socket.emit('set latest position', this.clients[i].device.serial);
                }); 
            });

            socket.on('update position', (data) => {
                $scope.$apply(() => {
                    this.onUpdatePosition(data);
                });
            });

            socket.on('update client', (data) => {
                $scope.$apply(() => {
                    this.onUpdateClient(data);
                    socket.emit('set latest position', data.device.serial);
                });
            });
        }

        onGetClients(data): void {
            this.clients = <Array<Models.Client>>data;
        }

        onUpdatePosition(data): void {
            var newPosition = new Models.Position(data);
            var exisitingPosition = this.getPosition(this.positions, newPosition.clientId);

            if (!exisitingPosition) {
                var marker = this.createMarker(newPosition.latitude, newPosition.longitude);
                var popup = '<p>' + newPosition.client.firstName + ' ' + newPosition.client.lastName + '</p>';
                marker.bindPopup(popup, {zoomAnimation: true});
                newPosition.marker = marker.addTo(this.map);
                newPosition.marker.openPopup();

                this.positions.push(newPosition);
                return;
            }

            exisitingPosition.marker.setLatLng([newPosition.latitude, newPosition.longitude]);
        }

        onUpdateClient(data): void {
            var newClient = new Models.Client(data);
            var existingClient = this.getClient(this.clients, newClient.id);

            if (!existingClient) 
                this.clients.push(newClient);
        }

        getClient(clients: Models.IClient[], clientId: number): Models.IClient {
            return clients.filter(e => e.id == clientId)[0];
        }

        getPosition(positions: Models.IPosition[], clientId: number): Models.IPosition {
            return positions.filter(e => e.clientId == clientId)[0];
        }

        createMarker(latitude: number, longitude: number): L.Marker {
            return L.marker([latitude, longitude]);
        }

        createMap(latCenter: number, lngCenter: number): void {
            var control = L.control.layers({ "Osm": osm, "Satellite": satellite });
            this.map = L.map('map', { center: L.latLng(latCenter, lngCenter), zoom: 12, zoomControl: false });
            this.map.addControl(control);
            osm.addTo(this.map);
        }
    }

    smartTracker.controller('MonitoringCtrl', MonitoringCtrl);
}