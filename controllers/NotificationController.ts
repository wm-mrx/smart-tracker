import * as sequelize from 'sequelize';
import * as crypto from 'crypto';
import { INotification } from '../models/Notification';
import { Instance } from '../models/Instance';
import BaseController from './BaseController';

class NotificationController extends BaseController<INotification>{
    constructor() {
        super('Notification');
        this.includes.push({ model: this.models.Client, as: 'client' });
    }

    applyQuery(query: any): any {
        var where: sequelize.WhereOptions = {};
        var options: sequelize.FindOptions = { where: where, include: this.includes };

        if (query['limit'] && query['skip']) {
            options.limit = query['limit'];
            options.offset = query['skip'];
        }

        return options;
    }
}

export default new NotificationController();