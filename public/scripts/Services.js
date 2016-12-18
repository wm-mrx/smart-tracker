var SmartTracker;
(function (SmartTracker) {
    var Services;
    (function (Services) {
        class User {
            static Find(id) {
                return SmartTracker.http.get(SmartTracker.service + 'user/find?id=' + id);
            }
            static FindAll(query) {
                return SmartTracker.http.get(SmartTracker.service + 'user/findAll?query=' + JSON.stringify(query));
            }
            static FindAllAndCount(query) {
                return SmartTracker.http.get(SmartTracker.service + 'user/findAllAndCount?query=' + JSON.stringify(query));
            }
            static Save(data) {
                return SmartTracker.http.post(SmartTracker.service + 'user/save', JSON.stringify(data));
            }
            static Delete(id) {
                return SmartTracker.http.delete(SmartTracker.service + 'user/delete?id=' + id);
            }
            static Login(data) {
                return SmartTracker.http.post(SmartTracker.service + 'user/authenticate', JSON.stringify(data));
            }
            static Logout() {
                return SmartTracker.http.get(SmartTracker.service + 'user/logout');
            }
        }
        Services.User = User;
        class Device {
            static Find(id) {
                return SmartTracker.http.get(SmartTracker.service + 'device/find?id=' + id);
            }
            static FindBySerial(serial) {
                return SmartTracker.http.get(SmartTracker.service + 'device/findBySerial?serial=' + serial);
            }
            static FindAll(query) {
                return SmartTracker.http.get(SmartTracker.service + 'device/findAll?query=' + JSON.stringify(query));
            }
            static FindAllAndCount(query) {
                return SmartTracker.http.get(SmartTracker.service + 'device/findAllAndCount?query=' + JSON.stringify(query));
            }
            static Save(data) {
                return SmartTracker.http.post(SmartTracker.service + 'device/save', JSON.stringify(data));
            }
            static Delete(id) {
                return SmartTracker.http.delete(SmartTracker.service + 'device/delete?id=' + id);
            }
        }
        Services.Device = Device;
        class Client {
            static Find(id) {
                return SmartTracker.http.get(SmartTracker.service + 'client/find?id=' + id);
            }
            static FindByDeviceSerial(serial) {
                return SmartTracker.http.get(SmartTracker.service + 'client/findByDeviceSerial?serial=' + serial);
            }
            static FindAll(query) {
                return SmartTracker.http.get(SmartTracker.service + 'client/findAll?query=' + JSON.stringify(query));
            }
            static FindAllAndCount(query) {
                return SmartTracker.http.get(SmartTracker.service + 'client/findAllAndCount?query=' + JSON.stringify(query));
            }
            static Save(data) {
                return SmartTracker.http.post(SmartTracker.service + 'client/save', JSON.stringify(data));
            }
            static Delete(id) {
                return SmartTracker.http.delete(SmartTracker.service + 'client/delete?id=' + id);
            }
        }
        Services.Client = Client;
        class Position {
            static Find(id) {
                return SmartTracker.http.get(SmartTracker.service + 'position/find?id=' + id);
            }
            static FindByClient(id) {
                return SmartTracker.http.get(SmartTracker.service + 'position/findByClient?id=' + id);
            }
            static FindAll(query) {
                return SmartTracker.http.get(SmartTracker.service + 'position/findAll?query=' + JSON.stringify(query));
            }
            static FindAllAndCount(query) {
                return SmartTracker.http.get(SmartTracker.service + 'position/findAllAndCount?query=' + JSON.stringify(query));
            }
            static Save(data) {
                return SmartTracker.http.post(SmartTracker.service + 'position/save', JSON.stringify(data));
            }
            static Delete(id) {
                return SmartTracker.http.delete(SmartTracker.service + 'position/delete?id=' + id);
            }
        }
        Services.Position = Position;
    })(Services = SmartTracker.Services || (SmartTracker.Services = {}));
})(SmartTracker || (SmartTracker = {}));
//# sourceMappingURL=Services.js.map