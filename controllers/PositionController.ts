import * as sequelize from 'sequelize';
import { IPosition } from '../models/Position';
import { Instance } from '../models/Instance';
import BaseController from './BaseController';

class PositionController extends BaseController<IPosition>{
    constructor() {
        super('Position');
        this.includes.push({ model: this.models.Client, as: 'client' });
    }

    findByClient(clientId: number): Promise<Instance<IPosition>[]> {
        return this.model.findAll({ where: { clientId: clientId }, include: this.includes });
    }

    findLatestByClient(clientId: number): Promise<Instance<IPosition>> {
        return this.model.findOne({ where: { clientId: clientId }, include: this.includes, order: ['id', 'DESC'] });
    }

    saveNotStationary(data: IPosition): Promise<Instance<boolean>> {
        return this.db.transaction((t) => {
            return this.model.findOne({ where: { latitude: data.latitude, longitude: data.longitude }, transaction: t }).then(res => {
                if (res)
                    return false;

                return this.model.insertOrUpdate(data, { transaction: t });
            });
        });
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

export default new PositionController();