import * as sequelize from 'sequelize';
import { IDevice } from '../models/Device';
import { Instance } from '../models/Instance';
import BaseController from './BaseController';

class DeviceController extends BaseController<IDevice>{
    constructor() {
        super('Device');
    }

    findBySerial(serial: string): Promise<Instance<IDevice>> {
        return this.model.findOne({ where: {serial: serial}, include: this.includes });
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

export default new DeviceController();