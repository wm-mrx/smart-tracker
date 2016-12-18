import * as sequelize from 'sequelize';
import { Instance } from '../models/Instance';
import { Model } from '../models/Model';
import { Models } from '../models/Configurator';

export default class BaseController<T>{
    db: sequelize.Sequelize;
    models: Models;
    model: Model<T>;
    includes: sequelize.IncludeOptions[];

    constructor(modelName) {
        this.db = global['db'];
        this.models = global['models'];
        this.model = this.models[modelName];
        this.includes = [];
    }

    find(id: number): Promise<Instance<T>> {
        return this.model.findById(id);
    }

    findAll(query: any): Promise<Instance<T>[]> {
        var parameter = this.applyQuery(query);
        return this.model.findAll(parameter);
    }

    findAllAndCount(query: any): Promise<{ rows: Instance<T>[], count: number }> {
        var parameter = this.applyQuery(query);
        return this.model.findAndCountAll(parameter);
    }

    save(data: any): Promise<boolean> {
        return this.model.insertOrUpdate(data, { validate: true });
    }

    delete(id: number): Promise<number> {
        return this.model.destroy({ where: { id: id } });
    }

    applyQuery(query: any): any {
        throw 'Not implemented';
    }
}