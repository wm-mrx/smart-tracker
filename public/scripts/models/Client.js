var SmartTracker;
(function (SmartTracker) {
    var Models;
    (function (Models) {
        class Client {
            constructor(data) {
                this.id = data ? data.id : null;
                this.deviceId = data ? data.deviceId : null;
                this.device = data ? data.device : null;
                this.firstName = data ? data.firstName : null;
                this.lastName = data ? data.lastName : null;
                this.birthDate = data ? data.birthDate : null;
                this.birthPlace = data ? data.birthPlace : null;
                this.address = data ? data.address : null;
                this.phone = data ? data.phone : null;
                this.passportNo = data ? data.passportNo : null;
                this.photoPath = data ? data.photoPath : null;
                this.registrationDate = data ? data.registrationDate : null;
            }
        }
        Models.Client = Client;
    })(Models = SmartTracker.Models || (SmartTracker.Models = {}));
})(SmartTracker || (SmartTracker = {}));
//# sourceMappingURL=Client.js.map