﻿import * as sequelize from 'sequelize';
import * as crypto from 'crypto';
import { IClient } from '../models/Client';
import { Instance } from '../models/Instance';
import BaseController from './BaseController';

class ClientController extends BaseController<IClient>{
    constructor() {
        super('Client');
        this.includes.push({ model: this.models.Device, as: 'device' });
    }

    findByDeviceSerial(serial: string): Promise<Instance<IClient>> {
        return this.db.transaction((t) => {
            return this.models.Device.findOne({ where: { serial: serial }, transaction: t }).then(res => {
                if (!res)
                    return null;

                var device = res.toJSON();

                return this.model.findOne({ where: { deviceId: device.id }, include: this.includes, transaction: t });
            });
        });
    }

    applyQuery(query: any): any {
        var where: sequelize.WhereOptions = {};
        var options: sequelize.FindOptions = { where: where, include: this.includes };

        if (query['firstName'])
            where['firstName'] = { $like: '%' + query['firstName'] + '%' };

        if (query['lastName'])
            where['lastName'] = { $like: '%' + query['lastName'] + '%' };

        if (query['limit'] && query['skip']) {
            options.limit = query['limit'];
            options.offset = query['skip'];
        }

        return options;
    }
}

export default new ClientController();