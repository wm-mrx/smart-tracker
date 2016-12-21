module SmartTracker.Controllers {
    declare var io: { connect(url: string): Socket; }

    class MonitoringCtrl {
        map: L.Map;
        clients: Models.IClient[];
        positions: Models.IPosition[];
        socket: Socket;

        static $inject = ['$scope', '$state', 'Notification'];

        constructor(public $scope, public $state, Notification) {
            this.clients = [];
            this.positions = [];
            this.createMap(-6.24771, 106.9353617);
            
            this.socket = io.connect(socketUrl);

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

            newPosition.client = exisitingPosition.client;
            newPosition.marker = exisitingPosition.marker;
            newPosition.marker.setLatLng([newPosition.latitude, newPosition.longitude]);

            var existingIndex = this.positions.indexOf(exisitingPosition);

            if (existingIndex > -1)
                this.positions[existingIndex] = newPosition;
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

        createMap(latitude: number, longitude: number): void {
            var control = L.control.layers({ "Osm": osm, "Satellite": satellite });
            this.map = L.map('map', { center: L.latLng(latitude, longitude), zoom: 12, zoomControl: false });
            this.map.addControl(control);
            osm.addTo(this.map);
        }

        positioning(client: Models.IClient): void {
            this.socket.emit('positioning', client.device.serial);
        }
    }

    smartTracker.controller('MonitoringCtrl', MonitoringCtrl);
}