module SmartTracker.Controllers {
    class HistoryCtrl {
        map: L.Map;
        positions: Models.IPosition[];
        marker: L.Marker;
        polyline: L.Polyline;
        filters: any;
        query: any;
        tracking: boolean;
        showToolbar: boolean;
        timer: NodeJS.Timer;
        counter: number;

        static $inject = ['$scope', '$state', 'Notification'];

        constructor(public $scope, $state, public Notification) {
            this.tracking = false;
            this.showToolbar = true;
            this.counter = 0;
            this.clearFilters();
            this.marker = null;
            this.polyline = null;
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
                var position = this.positions[0];
                this.marker = L.marker([position.latitude, position.longitude]).addTo(this.map);
                this.polyline = L.polyline([[position.latitude, position.longitude]]).addTo(this.map);
            });
        }

        clearFilters(): void {
            this.filters = { from: null, to: null, client: null };
        }

        createMap(latitude: number, longitude: number): void {
            var control = L.control.layers({ "Osm": osm, "Satellite": satellite });
            this.map = L.map('map', { center: L.latLng(latitude, longitude), zoom: 12, zoomControl: false });
            this.map.addControl(control);
            osm.addTo(this.map);

            this.map.invalidateSize({ animate: true });
        }

        start(): void {
            if (!this.positions || !this.marker || !this.polyline) {
                this.Notification.error('Client has not been set yet');
                return;
            }

            this.tracking = !this.tracking;

            if (!this.tracking) {
                this.stop();
                return;
            }

            var marker = this.marker;
            var polyline = this.polyline;
          
            this.timer = setInterval(() => {
                if (this.counter === 0) {
                    var position = this.positions[0];
                    
                    marker.setLatLng([position.latitude, position.longitude]);
                    polyline.setLatLngs([[position.latitude, position.longitude]]);
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
                    marker.setLatLng([position.latitude, position.longitude]);
                    polyline.addLatLng([position.latitude, position.longitude]);

                    this.counter++;
                });
            }, 2000);
        }

        stop(): void {
            clearInterval(this.timer);
        }

        queryClient(query: string): any {
            return Services.Client.FindAll({ firstName: query, lastName: query }).then(res => {
                return res.data;
            });
        }
    }

    smartTracker.controller('HistoryCtrl', HistoryCtrl);
}