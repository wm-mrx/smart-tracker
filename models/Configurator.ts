import * as sequelize from 'sequelize';
import * as User from './User';
import * as Client from './Client';
import * as Device from './Device';

import { Instance } from './Instance';
import { Model } from './Model';

export interface Models {
    User: Model<User.IUser>;
    Device: Model<Device.IDevice>;
    Client: Model<Client.IClient>;
}

export function synchronize(models: Models, force: boolean) {
    var keys = Object.keys(models);

    keys.forEach(key => {
        models[key].sync(force);
    });
}

export var create = (sequelize: sequelize.Sequelize) => {
    var models: Models = {
        User: define(sequelize, User.attributes, User.options, 'User'),
        Device: define(sequelize, Device.attributes, Device.options, 'Device'),
        Client: define(sequelize, Client.attributes, Client.options, 'Client')
    }

    models.Client.belongsTo(models.Device, { as: 'device', foreignKey: 'deviceId' });

    return models;
}

function define<T>(sequelize: sequelize.Sequelize, attributes: sequelize.DefineAttributes,
    options: sequelize.DefineOptions<Instance<T>>, name: string) {
    return sequelize.define<Instance<T>, T>(name, attributes, options);
}