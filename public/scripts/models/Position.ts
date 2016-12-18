module SmartTracker.Models {
    export interface IPosition {
        id: number;
        clientId: number;
        client?: any;
        latitude: number;
        longitude: number;
        speed?: number;
        transmissionMode?: string;
        positioningMode?: string;
        positioningType?: string;
        batteryLevel?: number;
        direction?: number;
        signalQuality?: number;
        date: Date;
    }

    export class Position {
        id: number;
        clientId: number;
        client: any;
        latitude: number;
        longitude: number;
        speed?: number;
        transmissionMode?: string;
        positioningMode?: string;
        positioningType?: string;
        batteryLevel?: number;
        direction?: number;
        signalQuality?: number;
        date: Date;

        constructor(data?: IPosition) {
            this.id = data ? data.id : null;
            this.clientId = data ? data.clientId : null;
            this.client = data ? data.client : null;
            this.latitude = data ? data.latitude : null;
            this.longitude = data ? data.longitude : null;
            this.speed = data ? data.speed : null;
            this.transmissionMode = data ? data.transmissionMode : null;
            this.positioningMode = data ? data.positioningMode : null;
            this.positioningType = data ? data.positioningType : null;
            this.batteryLevel = data ? data.batteryLevel : null;
            this.direction = data ? data.direction : null;
            this.signalQuality = data ? data.signalQuality : null;
            this.date = data ? data.date : null;
        }
    }
}