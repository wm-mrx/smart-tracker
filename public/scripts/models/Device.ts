module SmartTracker.Models {
    export interface IDevice {
        id: number;
        serial: string;
        imsi: string;
        number: string;
        ip: string;
        port: string;
    }

    export class Device {
        id: number;
        serial: string;
        imsi: string;
        number: string;
        ip: string;
        port: string;

        constructor(data?: IDevice) {
            this.id = data ? data.id : null;
            this.serial = data ? data.serial : null;
            this.imsi = data ? data.imsi : null;
            this.number = data ? data.number : null;
            this.ip = data ? data.ip : null;
            this.port = data ? data.port : null;
        }
    }
}