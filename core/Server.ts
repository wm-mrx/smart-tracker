import * as net from 'net';
import * as http from 'http';
import * as socketio from 'socket.io';
import Device from './Device';

export default class Server {
    clientServer: http.Server;
    io: SocketIO.Server;
    devices: any = {};

    constructor(app) {
        var server = http.createServer(app);
        this.io = socketio(server);
        this.clientServer = server;
    }

    startDevice(ports: number[]): void {
        ports.forEach(port => {
            var server = net.createServer((socket) => {
                socket.on('data', (data) => {
                    var commands = data.toString().split(';');
                    var serial = commands[1];
                    var device: Device = this.devices[serial];

                    if (!device) {
                        this.authenticateDevice(serial);
                        return;
                    }
                });
            });

            server.listen(port);
        });
    }

    startClient(port): void {
        this.io.on('connection', (socket) => {

        });

        this.clientServer.listen(port);
    }

    authenticateDevice(serial: string): void {

    }
}