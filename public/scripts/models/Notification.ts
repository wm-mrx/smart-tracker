module SmartTracker.Models {
    export interface INotification {
        id: number;
        clientId: number;
        client?: any;
        message: string;
        date: Date;
        type: string;
    }

    export class Notification {
        id: number;
        clientId: number;
        client: any;
        message: string;
        date: Date;
        type: string;

        constructor(data?: INotification) {
            this.id = data ? data.id : null;
            this.clientId = data ? data.clientId : null;
            this.client = data ? data.client : null;
            this.message = data ? data.message : null;
            this.date = data ? data.date : null;
            this.type = data ? data.type : null;
        }
    }
}