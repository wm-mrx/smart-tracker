module SmartTracker.Models {
    export interface IUser {
        id: number;
        name: string;
        userName: string;
        hash: string;
        salt: string;
    }

    export class User {
        id: number;
        name: string;
        userName: string;
        hash: string;
        salt: string;

        constructor(data?: IUser) {
            this.id = data ? data.id : null;
            this.name = data ? data.name : null;
            this.userName = data ? data.userName : null;
            this.hash = data ? data.hash : null;
            this.salt = data ? data.salt : null;
        }
    }
}