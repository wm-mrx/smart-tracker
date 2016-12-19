module SmartTracker.Controllers {
    declare var io: { connect(url: string): Socket; }

    interface Socket {
        on(event: string, callback: (data: any) => void);
        emit(event: string, data: any);
    }

    interface IClientMarker {
        client: Models.IClient;
        marker: L.Marker;
    }

    class MonitoringCtrl {
        map: L.Map;
        clientMarkers: IClientMarker[];

        static $inject = ['$scope', '$state', 'principal'];

        constructor(public $scope, public $state, public principal) {
            this.clientMarkers = [];

            this.initMap();
            
            principal.identity().then((identity) => {
                this.initSocket(identity);
            });
        }

        initSocket(identity: any): void {
            var scope = this.$scope;
            var socket: Socket = io.connect(socketUrl);

            socket.emit('set clients', null);

            socket.on('get clients', (data) => {
                scope.$apply(() => {
                    var clients = <Array<any>>data;

                    clients.forEach(client => {
                        socket.emit('set latest position', client.device.serial);
                    });
                });
            });

            socket.on('get latest position', (data) => {
                scope.$apply(() => {
                    var position = new Models.Position(data);
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
                var position = new Models.Position(data);
                var existingClient = this.clientMarkers.filter(e => e.client.id == position.clientId)[0];

                if (!existingClient) {
                    var label = position.client.firstName + ' ' + position.client.lastName;
                    var marker = this.createMarker(position.latitude, position.longitude).bindPopup('<p>' + label + '</p>').addTo(this.map);
                    this.clientMarkers.push({ client: position.client, marker: marker });
                }

                existingClient.marker.setLatLng([position.latitude, position.longitude]);
            });

            socket.on('update client', (data) => {
                var client = new Models.Client(data);
                socket.emit('set latest position', client.device.serial);
            });
        }

        initMap(): void {
            var control = L.control.layers({ "Osm": osm, "Satellite": satellite });

            this.map = L.map('map', { center: L.latLng(-6.24771, 106.9353617), zoom: 12, zoomControl: false });
            this.map.addControl(control);
            osm.addTo(this.map);
        }

        createMarker(latitude: number, longitude: number): L.Marker {
            return L.marker([latitude, longitude]);
        }
    }

    smartTracker.controller('MonitoringCtrl', MonitoringCtrl);
}