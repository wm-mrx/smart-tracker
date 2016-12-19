﻿module SmartTracker.Controllers {
    declare var io: { connect(url: string): Socket; }

    interface Socket {
        on(event: string, callback: (data: any) => void);
        emit(event: string, data: any);
    }

    class MonitoringCtrl {
        map: L.Map;
        markers: L.Marker[];
        clients: Models.Client[];
        logs: any[];

        static $inject = ['$scope', '$state', 'principal'];

        constructor(public $scope, public $state, public principal) {
            this.markers = [];
            this.logs = [];
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
                this.clients = [];

                scope.$apply(() => {
                    var clients = <Array<any>>data;

                    clients.forEach(client => {
                        this.clients.push(client);
                        socket.emit('set latest position', client.device.serial);
                    });
                });
            });

            socket.on('get latest position', (data) => {
                scope.$apply(() => {
                    this.logs.push(position);
                    var position = new Models.Position(data);
                    var existingMarker = this.markers.filter(e => e['clientId'] == position.clientId)[0];

                    if (!existingMarker) {
                        var marker = this.createMarker(position.latitude, position.longitude);
                        marker.bindPopup('<p>' + position.client.firstName + ' ' + position.client.lastName + '</p>', { autoClose: false }).addTo(this.map);
                        this.markers.push(marker);
                        return;
                    }

                    existingMarker.setLatLng([position.latitude, position.longitude]);
                });
            });

            socket.on('update position', (data) => {
               
            });

            socket.on('update client', (data) => {
                scope.$apply(() => {
                    var client = new Models.Client(data);
                    var existingClient = this.clients.filter(e => e.id == client.id)[0];

                    if (!existingClient)
                        this.clients.push(client);

                    socket.emit('set latest position', client.device.serial);
                });
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