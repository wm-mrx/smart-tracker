"use strict";
const express = require("express");
const sequelize = require("sequelize");
const configurator = require("./models/Configurator");
const config_1 = require("./utils/config");
const devicePorts = [config_1.default('device_port1'), config_1.default('device_port2')];
const clientPort = config_1.default('client_port');
var app = express();
var db = new sequelize(config_1.default('connection_string'));
var models = configurator.create(db);
global['db'] = db;
global['models'] = models;
if (config_1.default('auto_generate'))
    configurator.synchronize(models, true);
const Server_1 = require("./core/Server");
var core = new Server_1.default(app);
core.startClient(clientPort);
core.startDevice(devicePorts);
//# sourceMappingURL=app.js.map