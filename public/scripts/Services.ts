module SmartTracker.Services {
    export class User {
        static Find(id: number) {
            return http.get(service + 'user/find?id=' + id);
        }

        static FindAll(query: any) {
            return http.get(service + 'user/findAll?query=' + JSON.stringify(query));
        }

        static FindAllAndCount(query: any) {
            return http.get(service + 'user/findAllAndCount?query=' + JSON.stringify(query));
        }

        static Save(data: any) {
            return http.post(service + 'user/save', JSON.stringify(data));
        }

        static Delete(id: number) {
            return http.delete(service + 'user/delete?id=' + id);
        }

        static Login(data: any) {
            return http.post(service + 'user/authenticate', JSON.stringify(data));
        }

        static Logout() {
            return http.get(service + 'user/logout');
        }
    }

    export class Device {
        static Find(id: number) {
            return http.get(service + 'device/find?id=' + id);
        }

        static FindBySerial(serial: string) {
            return http.get(service + 'device/findBySerial?serial=' + serial);
        }

        static FindAll(query: any) {
            return http.get(service + 'device/findAll?query=' + JSON.stringify(query));
        }

        static FindAllAndCount(query: any) {
            return http.get(service + 'device/findAllAndCount?query=' + JSON.stringify(query));
        }

        static Save(data: any) {
            return http.post(service + 'device/save', JSON.stringify(data));
        }

        static Delete(id: number) {
            return http.delete(service + 'device/delete?id=' + id);
        }
    }

    export class Client {
        static Find(id: number) {
            return http.get(service + 'client/find?id=' + id);
        }

        static FindByDeviceSerial(serial: string) {
            return http.get(service + 'client/findByDeviceSerial?serial=' + serial);
        }

        static FindAll(query: any) {
            return http.get(service + 'client/findAll?query=' + JSON.stringify(query));
        }

        static FindAllAndCount(query: any) {
            return http.get(service + 'client/findAllAndCount?query=' + JSON.stringify(query));
        }

        static Save(data: any) {
            return http.post(service + 'client/save', JSON.stringify(data));
        }

        static Delete(id: number) {
            return http.delete(service + 'client/delete?id=' + id);
        }
    }

    export class Position {
        static Find(id: number) {
            return http.get(service + 'position/find?id=' + id);
        }

        static FindByClient(id: number) {
            return http.get(service + 'position/findByClient?id=' + id);
        }

        static FindAll(query: any) {
            return http.get(service + 'position/findAll?query=' + JSON.stringify(query));
        }

        static FindAllAndCount(query: any) {
            return http.get(service + 'position/findAllAndCount?query=' + JSON.stringify(query));
        }

        static Save(data: any) {
            return http.post(service + 'position/save', JSON.stringify(data));
        }

        static Delete(id: number) {
            return http.delete(service + 'position/delete?id=' + id);
        }
    }
}