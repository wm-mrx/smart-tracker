var SmartTracker;
(function (SmartTracker) {
    var Models;
    (function (Models) {
        class Notification {
            constructor(data) {
                this.id = data ? data.id : null;
                this.clientId = data ? data.clientId : null;
                this.client = data ? data.client : null;
                this.message = data ? data.message : null;
                this.date = data ? data.date : null;
                this.type = data ? data.type : null;
            }
        }
        Models.Notification = Notification;
    })(Models = SmartTracker.Models || (SmartTracker.Models = {}));
})(SmartTracker || (SmartTracker = {}));
//# sourceMappingURL=Notification.js.map