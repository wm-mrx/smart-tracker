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

app.use(session({ secret: config('secret'), saveUninitialized: true, resave: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/smartracker/', express.static(path.join(__dirname, 'public')));
app.use('/smartracker/modules', express.static(path.join(__dirname, '/node_modules/')));
app.use('/smartracker/js', express.static(path.join(__dirname, '/public/js/')));
app.use('/smartracker/app', express.static(path.join(__dirname, '/public/scripts/')));
app.use('/smartracker/css', express.static(path.join(__dirname, '/public/css/')));

app.listen(config('port'), (error) => {
    console.log('Smart Tracker is running on port %s', config('port'));
    console.log('Smart Tracker DB is running');
});

app.get('/smartracker', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

app.get('/smartracker/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

app.get('/smartracker/client', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

app.get('/smartracker/monitoring', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

import userRoutes from './routes/UserRoutes';
import deviceRoutes from './routes/DeviceRoutes';
import clientRoutes from './routes/ClientRoutes';
import positionRoutes from './routes/PositionRoutes';

app.use(userRoutes);
app.use(deviceRoutes);
app.use(clientRoutes);
app.use(positionRoutes);

import Server from './core/Server';

var core = new Server(app);

core.startClient(clientPort);
core.startDevice(devicePorts);