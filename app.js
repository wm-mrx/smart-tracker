"use strict";
const express = require("express");
const config_1 = require("./utils/config");
const devicePorts = [config_1.default('device_port1'), config_1.default('device_port2')];
const clientPort = config_1.default('client_port');
var app = express();
const Server_1 = require("./core/Server");
var core = new Server_1.default(app);
core.startClient(clientPort);
core.startDevice(devicePorts);
//# sourceMappingURL=app.js.map