var SmartTracker;
(function (SmartTracker) {
    var Models;
    (function (Models) {
        class User {
            constructor(data) {
                this.id = data ? data.id : null;
                this.name = data ? data.name : null;
                this.userName = data ? data.userName : null;
                this.hash = data ? data.hash : null;
                this.salt = data ? data.salt : null;
            }
        }
        Models.User = User;
    })(Models = SmartTracker.Models || (SmartTracker.Models = {}));
})(SmartTracker || (SmartTracker = {}));
//# sourceMappingURL=User.js.map