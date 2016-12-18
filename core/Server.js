"use strict";
const net = require("net");
const http = require("http");
const socketio = require("socket.io");
class Server {
    startDevice(ports) {
        ports.forEach(port => {
            var server = net.createServer((socket) => {
            });
            server.listen(port);
        });
    }
    startClient(app, port) {
        var server = http.createServer(app);
        this.io = socketio(server);
        this.io.on('connection', (socket) => {
        });
        server.listen(port);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Server;
//# sourceMappingURL=Server.js.map