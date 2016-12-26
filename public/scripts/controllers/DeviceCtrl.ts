module SmartTracker.Controllers {
    class DeviceCtrl {
        entity: Models.IDevice;
        entities: Models.IDevice[];
        showToolbar: boolean;
        showForm: boolean;
        filters: any;
        query: any;
        paging: any;

        static $inject = ['$scope', '$state', 'Notification'];

        constructor(public $scope, public $state, public Notification) {
            this.showToolbar = false;
            this.showForm = false;
            this.filters = {};
            this.query = {};
            this.paging = { page: 1, max: 10, total: 0 };
            this.filter();
        }

        filter(): void {
            this.createQuery();
            this.load();
        }

        load(): void {
            Services.Device.FindAllAndCount(this.query).then(res => {
                var rows = <Array<Models.IDevice>>res.data['rows'];
                var count = res.data['count'];

                this.entities = rows;
                this.paging.total = count;
            }).catch(exception => {
                this.Notification.error(exception.data);
            });
        }

        save(): void {
            Services.Device.Save(this.entity).then(res => {
                this.filter();
                this.showForm = false;
            }).catch(exception => {
                this.Notification.error(exception.data);
            });
        }

        delete(id: number): void {
            var confirmed = confirm('Client will be deleted, are you sure?');

            if (!confirmed)
                return;

            Services.Device.Delete(id).then(res => {
                this.filter();
            }).catch(exception => {
                this.Notification.error(exception.data);
            });
        }

        add(): void {
            this.entity = new Models.Device(null);
            this.showForm = true;
        }

        edit(entity: Models.IDevice): void {
            this.entity = new Models.Device(entity);
            this.showForm = true;
        }

        createQuery(): void {
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

        cancelForm(): void {
            this.showForm = false;
            this.filter();
        }
    }

    smartTracker.controller('DeviceCtrl', DeviceCtrl);
}