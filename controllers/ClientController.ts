import * as sequelize from 'sequelize';
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

    save(data): Promise<boolean> {
        data['deviceId'] = data['device']['id'];
        return this.model.insertOrUpdate(data, { validate: true }); 
    }

    applyQuery(query: any): any {
        var where: sequelize.WhereOptions = {};
        var options: sequelize.FindOptions = { where: where, include: this.includes };

        if (query['name'])
            where['$or'] = [{ firstName: '%' + query['name'] + '%', lastName: '%' + query['name'] + '%' }];

        if (query['limit'] && query['skip']) {
            options.limit = query['limit'];
            options.offset = query['skip'];
        }

        return options;
    }
}

export default new ClientController();