"use strict";
const User = require("./User");
const Client = require("./Client");
const Device = require("./Device");
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
        Client: define(sequelize, Client.attributes, Client.options, 'Client')
    };
    models.Client.belongsTo(models.Device, { as: 'device', foreignKey: 'deviceId' });
    return models;
};
function define(sequelize, attributes, options, name) {
    return sequelize.define(name, attributes, options);
}
//# sourceMappingURL=Configurator.js.map