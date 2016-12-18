"use strict";
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
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
app.use(session({ secret: config_1.default('secret'), saveUninitialized: true, resave: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/smartracker/', express.static(path.join(__dirname, 'public')));
app.use('/smartracker/modules', express.static(path.join(__dirname, '/node_modules/')));
app.use('/smartracker/js', express.static(path.join(__dirname, '/public/js/')));
app.use('/smartracker/app', express.static(path.join(__dirname, '/public/scripts/')));
app.use('/smartracker/css', express.static(path.join(__dirname, '/public/css/')));
app.listen(config_1.default('port'), (error) => {
    console.log('Smart Tracker is running on port %s', config_1.default('port'));
    console.log('Smart Tracker DB is running');
});
app.get('/smartracker', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/Views/index.html'));
});
app.get('/smartracker/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/Views/index.html'));
});
app.get('/smartracker/client', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/Views/index.html'));
});
app.get('/smartracker/monitoring', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/Views/index.html'));
});
const UserRoutes_1 = require("./routes/UserRoutes");
const DeviceRoutes_1 = require("./routes/DeviceRoutes");
const ClientRoutes_1 = require("./routes/ClientRoutes");
const PositionRoutes_1 = require("./routes/PositionRoutes");
app.use(UserRoutes_1.default);
app.use(DeviceRoutes_1.default);
app.use(ClientRoutes_1.default);
app.use(PositionRoutes_1.default);
const Server_1 = require("./core/Server");
var core = new Server_1.default(app);
core.startClient(clientPort);
core.startDevice(devicePorts);
const UserController_1 = require("./controllers/UserController");
UserController_1.default.save({ "name": 'admin', "userName": 'admin', "password": 'admin' });
//# sourceMappingURL=app.js.map