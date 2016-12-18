module SmartTracker.Models {
    export interface IClient {
        id: number;
        deviceId: number;
        device?: any;
        firstName: string;
        lastName: string;
        birthDate?: Date;
        birthPlace?: string;
        address?: string;
        phone?: string;
        passportNo?: string;
        photoPath?: string;
        registrationDate: Date;
    }

    export class Client {
        id: number;
        deviceId: number;
        device?: any;
        firstName: string;
        lastName: string;
        birthDate?: Date;
        birthPlace?: string;
        address?: string;
        phone?: string;
        passportNo?: string;
        photoPath?: string;
        registrationDate: Date;

        constructor(data?: IClient) {
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
}