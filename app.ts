import * as express from 'express';
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as sequelize from 'sequelize';
import config from './utils/config';

const devicePorts = [config('device_port1'), config('device_port2')];

var app = express();

import Server from './core/Server';

var core = new Server();

core.startClient(app, config('client_port'));
core.startDevice(devicePorts);