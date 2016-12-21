var SmartTracker;
(function (SmartTracker) {
    var Controllers;
    (function (Controllers) {
        class HistoryCtrl {
            constructor($scope, $state) {
                this.$scope = $scope;
                this.tracking = false;
                this.counter = 0;
                this.clearFilters();
                this.createMap(-6.24771, 106.9353617);
            }
            filter() {
                this.query = {};
                if (this.filters.from)
                    this.query['from'] = this.filters.from;
                if (this.filters.to)
                    this.query['to'] = this.filters.to;
                if (this.filters.client)
                    this.query['clientId'] = this.filters.client.id;
                SmartTracker.Services.Position.FindAll(this.query).then(res => {
                    this.positions = res.data;
                    this.updateMarker(this.positions[0].latitude, this.positions[0].longitude);
                    this.setLine(this.positions[0].latitude, this.positions[0].longitude);
                });
            }
            clearFilters() {
                this.filters = { from: null, to: null, client: null };
            }
            createMarker(latitude, longitude) {
                this.marker = L.marker([latitude, longitude]).addTo(this.map);
            }
            createPolyLine(latitude, longitude) {
                this.polyline = L.polyline([[latitude, longitude]]).addTo(this.map);
            }
            updateMarker(latitude, longitude) {
                this.marker.setLatLng([latitude, longitude]);
            }
            setLine(latitude, longitude) {
                this.polyline.setLatLngs([[latitude, longitude]]);
            }
            addLine(latitude, longitude) {
                this.polyline.addLatLng([latitude, longitude]);
            }
            createMap(latitude, longitude) {
                var control = L.control.layers({ "Osm": SmartTracker.osm, "Satellite": SmartTracker.satellite });
                this.map = L.map('map', { center: L.latLng(latitude, longitude), zoom: 12, zoomControl: false });
                this.map.addControl(control);
                SmartTracker.osm.addTo(this.map);
            }
            start() {
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
            stop() {
                clearInterval(this.timer);
            }
        }
        HistoryCtrl.$inject = ['$scope', '$state'];
        SmartTracker.smartTracker.controller('HistroyCtrl', HistoryCtrl);
    })(Controllers = SmartTracker.Controllers || (SmartTracker.Controllers = {}));
})(SmartTracker || (SmartTracker = {}));
//# sourceMappingURL=HistoryCtrl.js.map