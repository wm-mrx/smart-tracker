var SmartTracker;
(function (SmartTracker) {
    var Models;
    (function (Models) {
        class Device {
            constructor(data) {
                this.id = data ? data.id : null;
                this.serial = data ? data.serial : null;
                this.number = data ? data.number : null;
                this.ip = data ? data.ip : null;
                this.port = data ? data.port : null;
            }
        }
        Models.Device = Device;
    })(Models = SmartTracker.Models || (SmartTracker.Models = {}));
})(SmartTracker || (SmartTracker = {}));
//# sourceMappingURL=Device.js.map