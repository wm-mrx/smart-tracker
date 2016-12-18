import * as express from 'express';
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as sequelize from 'sequelize';
import * as configurator from './models/Configurator';

import config from './utils/config';

const devicePorts = [config('device_port1'), config('device_port2')];
const clientPort = config('client_port');

var app = express();
var db = new sequelize(config('connection_string'));
var models = configurator.create(db);

global['db'] = db;
global['models'] = models;

if (config('auto_generate'))
    configurator.synchronize(models, true);

import Server from './core/Server';

var core = new Server(app);

core.startClient(clientPort);
core.startDevice(devicePorts);