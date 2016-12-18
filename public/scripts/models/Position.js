var SmartTracker;
(function (SmartTracker) {
    var Models;
    (function (Models) {
        class Position {
            constructor(data) {
                this.id = data ? data.id : null;
                this.clientId = data ? data.clientId : null;
                this.client = data ? data.client : null;
                this.latitude = data ? data.latitude : null;
                this.longitude = data ? data.longitude : null;
                this.speed = data ? data.speed : null;
                this.transmissionMode = data ? data.transmissionMode : null;
                this.positioningMode = data ? data.positioningMode : null;
                this.positioningType = data ? data.positioningType : null;
                this.batteryLevel = data ? data.batteryLevel : null;
                this.direction = data ? data.direction : null;
                this.signalQuality = data ? data.signalQuality : null;
                this.date = data ? data.date : null;
            }
        }
        Models.Position = Position;
    })(Models = SmartTracker.Models || (SmartTracker.Models = {}));
})(SmartTracker || (SmartTracker = {}));
//# sourceMappingURL=Position.js.map