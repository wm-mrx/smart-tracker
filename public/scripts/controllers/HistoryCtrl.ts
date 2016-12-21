module SmartTracker.Controllers {
    class HistoryCtrl {
        map: L.Map;
        positions: Models.IPosition[];
        marker: L.Marker;
        polyline: L.Polyline;
        filters: any;
        query: any;
        tracking: boolean;
        timer: NodeJS.Timer;
        counter: number;

        static $inject = ['$scope', '$state'];

        constructor(public $scope, $state) {
            this.tracking = false;
            this.counter = 0;
            this.clearFilters();
            this.createMap(-6.24771, 106.9353617);
        }

        filter(): void {
            this.query = {};

            if (this.filters.from)
                this.query['from'] = this.filters.from;
            if (this.filters.to)
                this.query['to'] = this.filters.to;
            if (this.filters.client)
                this.query['clientId'] = this.filters.client.id;

            Services.Position.FindAll(this.query).then(res => {
                this.positions = <Array<Models.IPosition>>res.data;
                this.updateMarker(this.positions[0].latitude, this.positions[0].longitude);
                this.setLine(this.positions[0].latitude, this.positions[0].longitude); 
            });
        }

        clearFilters(): void {
            this.filters = { from: null, to: null, client: null };
        }

        createMarker(latitude: number, longitude: number): void {
            this.marker = L.marker([latitude, longitude]).addTo(this.map);
        }

        createPolyLine(latitude: number, longitude: number): void {
            this.polyline = L.polyline([[latitude, longitude]]).addTo(this.map);
        }

        updateMarker(latitude: number, longitude: number): void {
            this.marker.setLatLng([latitude, longitude]);
        }

        setLine(latitude: number, longitude: number): void {
            this.polyline.setLatLngs([[latitude, longitude]]);
        }

        addLine(latitude: number, longitude: number): void {
            this.polyline.addLatLng([latitude, longitude]);
        }

        createMap(latitude: number, longitude: number): void {
            var control = L.control.layers({ "Osm": osm, "Satellite": satellite });
            this.map = L.map('map', { center: L.latLng(latitude, longitude), zoom: 12, zoomControl: false });
            this.map.addControl(control);
            osm.addTo(this.map);
        }

        start(): void {
            this.tracking = !this.tracking;

            if (!this.tracking) {
                this.stop();
                return;
            }

            var updateMarker = this.updateMarker;
            var setLine = this.setLine;
            var addLine = this.addLine;

            this.timer = setInterval(() => {
                if (this.counter === 0) {
                    var position = this.positions[0];
                    updateMarker(position.latitude, position.longitude);
                    setLine(position.latitude, position.longitude);
                }

                if (this.counter > this.positions.length - 1) {
                    this.$scope.$apply(() => {
                        this.stop();
                        this.counter = 0;
                        this.tracking = false;
                        return;
                    });
                }

                this.$scope.$apply(() => {
                    var position = this.positions[this.counter];
                    updateMarker(position.latitude, position.longitude);
                    addLine(position.latitude, position.longitude);
                });
            }, 2000);
        }

        stop(): void {
            clearInterval(this.timer);
        }
    }

    smartTracker.controller('HistroyCtrl', HistoryCtrl);
}