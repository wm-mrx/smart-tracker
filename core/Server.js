"use strict";
const net = require("net");
const http = require("http");
const socketio = require("socket.io");
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
                        this.authenticateDevice(serial);
                        return;
                    }
                });
            });
            server.listen(port);
        });
    }
    startClient(port) {
        this.io.on('connection', (socket) => {
        });
        this.clientServer.listen(port);
    }
    authenticateDevice(serial) {
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Server;
//# sourceMappingURL=Server.js.map