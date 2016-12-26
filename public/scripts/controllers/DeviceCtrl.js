var SmartTracker;
(function (SmartTracker) {
    var Controllers;
    (function (Controllers) {
        class DeviceCtrl {
            constructor($scope, $state, Notification) {
                this.$scope = $scope;
                this.$state = $state;
                this.Notification = Notification;
                this.showToolbar = false;
                this.showForm = false;
                this.filters = {};
                this.query = {};
                this.paging = { page: 1, max: 10, total: 0 };
                this.filter();
            }
            filter() {
                this.createQuery();
                this.load();
            }
            load() {
                SmartTracker.Services.Device.FindAllAndCount(this.query).then(res => {
                    var rows = res.data['rows'];
                    var count = res.data['count'];
                    this.entities = rows;
                    this.paging.total = count;
                }).catch(exception => {
                    this.Notification.error(exception.data);
                });
            }
            save() {
                SmartTracker.Services.Device.Save(this.entity).then(res => {
                    this.filter();
                    this.showForm = false;
                }).catch(exception => {
                    this.Notification.error(exception.data);
                });
            }
            delete(id) {
                var confirmed = confirm('Client will be deleted, are you sure?');
                if (!confirmed)
                    return;
                SmartTracker.Services.Device.Delete(id).then(res => {
                    this.filter();
                }).catch(exception => {
                    this.Notification.error(exception.data);
                });
            }
            add() {
                this.entity = new SmartTracker.Models.Device(null);
                this.showForm = true;
            }
            edit(entity) {
                this.entity = new SmartTracker.Models.Device(entity);
                this.showForm = true;
            }
            createQuery() {
                this.query = {};
                this.query['limit'] = this.paging.max;
                this.query['skip'] = (this.paging.page - 1) * this.paging.max;
                var keys = Object.keys(this.filters);
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    if (this.filters[key] && this.filters[key]['_id'])
                        this.query[key] = this.filters[key]['_id'];
                    else
                        this.query[key] = this.filters[key];
                }
            }
            cancelForm() {
                this.showForm = false;
                this.filter();
            }
        }
        DeviceCtrl.$inject = ['$scope', '$state', 'Notification'];
        SmartTracker.smartTracker.controller('DeviceCtrl', DeviceCtrl);
    })(Controllers = SmartTracker.Controllers || (SmartTracker.Controllers = {}));
})(SmartTracker || (SmartTracker = {}));
//# sourceMappingURL=DeviceCtrl.js.map