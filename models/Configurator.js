"use strict";
const User = require("./User");
const Client = require("./Client");
const Device = require("./Device");
const Position = require("./Position");
const Notification = require("./Notification");
function synchronize(models, force) {
    var keys = Object.keys(models);
    keys.forEach(key => {
        models[key].sync(force);
    });
}
exports.synchronize = synchronize;
exports.create = (sequelize) => {
    var models = {
        User: define(sequelize, User.attributes, User.options, 'User'),
        Device: define(sequelize, Device.attributes, Device.options, 'Device'),
        Client: define(sequelize, Client.attributes, Client.options, 'Client'),
        Position: define(sequelize, Position.attributes, Position.options, 'Position'),
        Notification: define(sequelize, Notification.attributes, Notification.options, 'Notification')
    };
    models.Client.belongsTo(models.Device, { as: 'device', foreignKey: 'deviceId' });
    models.Position.belongsTo(models.Client, { as: 'client', foreignKey: 'clientId' });
    models.Notification.belongsTo(models.Client, { as: 'client', foreignKey: 'clientId' });
    return models;
};
function define(sequelize, attributes, options, name) {
    return sequelize.define(name, attributes, options);
}
//# sourceMappingURL=Configurator.js.map