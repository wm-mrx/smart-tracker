import * as sequelize from 'sequelize';
import * as User from './User';
import * as Client from './Client';
import * as Device from './Device';
import * as Position from './Position';
import { Instance } from './Instance';
import { Model } from './Model';

export interface Models {
    User: Model<User.IUser>;
    Device: Model<Device.IDevice>;
    Client: Model<Client.IClient>;
    Position: Model<Position.IPosition>;
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
        Client: define(sequelize, Client.attributes, Client.options, 'Client'),
        Position: define(sequelize, Position.attributes, Position.options, 'Position')
    }

    models.Client.belongsTo(models.Device, { as: 'device', foreignKey: 'deviceId' });
    models.Position.belongsTo(models.Client, { as: 'client', foreignKey: 'clientId' });

    return models;
}

function define<T>(sequelize: sequelize.Sequelize, attributes: sequelize.DefineAttributes,
    options: sequelize.DefineOptions<Instance<T>>, name: string) {
    return sequelize.define<Instance<T>, T>(name, attributes, options);
}