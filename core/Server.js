"use strict";
const net = require("net");
const http = require("http");
const socketio = require("socket.io");
const Device_1 = require("./Device");
const ClientController_1 = require("../controllers/ClientController");
class Server {
    constructor(app) {
        this.devices = {};
        var server = http.createServer(app);
        this.io = socketio(server);
        this.clientServer = server;
    }
    startDevice(ports) {
        ports.forEach(port => {
            var server = net.createServer((socket) => {
                socket.on('data', (data) => {
                    var commands = data.toString().split(';');
                    var serial = commands[1];
                    var device = this.devices[serial];
                    if (!device) {
                        this.authenticateDevice(serial, socket);
                        return;
                    }
                    device.socket = socket;
                    device.onDataReceived(data);
                });
                socket.pipe(socket);
            });
            server.listen(port, () => {
                console.log('Device server is running on port %s', port);
            });
        });
    }
    startClient(port) {
        this.io.on('connection', (socket) => { });
        this.clientServer.listen(port, () => {
            console.log('Client server is running on port %s', port);
        });
    }
    authenticateDevice(serial, socket) {
        ClientController_1.default.findByDeviceSerial(serial).then(res => {
            if (!res) {
                console.log('Client is not found');
                return;
            }
            var client = res.toJSON();
            var device = new Device_1.default(socket, client, this.io);
            this.devices[serial] = device;
            device.io.emit('update client', client);
            console.log('Device %s is authenticated', serial);
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Server;
//# sourceMappingURL=Server.js.map