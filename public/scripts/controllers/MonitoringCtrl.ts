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
        clients: Models.IClient[];
        clientMarkers: IClientMarker[];

        osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        });

        satellite = L.tileLayer('https://api.mapbox.com/styles/v1/vampire13/civxpqmqe006z2jo5r3ata02a/tiles/256/{z}/{x}/{y}?access_token={apiKey}', {
            user: 'vampire13',
            apiKey: 'pk.eyJ1IjoidmFtcGlyZTEzIiwiYSI6ImNpdnhwa3M2azAyZHMydHRheHN4NDF6dXAifQ.inowv5XJuorxQA_fsWxciQ',
            mapId: 'mapbox.mapbox-streets-v7'
        });

        static $inject = ['$scope', '$state', 'principal'];

        constructor(public $scope, public $state, public principal) {
            this.clients = [];
            this.clientMarkers = [];

            principal.identity().then((identity) => {
                this.initMap();

                var socket = io.connect(socketUrl);

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
                            var client = new Models.Client(clients[i]);
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
                        var position = new Models.Position(data);
                        var client = this.clients.filter(e => e.id == position.clientId)[0];

                        var latlng = L.latLng(position.latitude, position.longitude);
                        var existingClientMarker = this.clientMarkers.filter(e => e.client.id == client.id)[0];

                        if (!existingClientMarker) {
                            var newMarker = L.marker(latlng);
                            newMarker['client'] = client;
                            newMarker.addTo(this.map);
                            return;
                        }

                        existingClientMarker.marker.setLatLng(latlng);
                    });
                });

                socket.on('update client', (data) => {
                    $scope.$apply(() => {
                        var client = new Models.Client(data);
                        var existingClient = this.clients.filter(e => e.id ==  client.id)[0];

                        if (!existingClient) {
                            socket.emit('set latest position', client.device.serial);
                            this.clients.push(client);
                        }
                    });
                });
            });
        }

        initMap(): void {
            this.map = L.map('map', { center: L.latLng(-6.24771, 106.9353617), zoom: 12, zoomControl: false });
            L.control.layers({ "Osm": this.osm, "Satellite": this.satellite }).addTo(this.map);
            this.osm.addTo(this.map);
        }
    }

    smartTracker.controller('MonitoringCtrl', MonitoringCtrl);
}