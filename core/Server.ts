import * as net from 'net';
import * as http from 'http';
import * as socketio from 'socket.io';
import Device from './Device';
import DeviceController from '../controllers/DeviceController';
import ClientController from '../controllers/ClientController';

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

    startClient(port): void {
        this.io.on('connection', (socket) => {});

        this.clientServer.listen(port, () => {
            console.log('Client server is running on port %s', port);
        });
    }

    authenticateDevice(serial: string, socket): void {
        ClientController.findByDeviceSerial(serial).then(res => {
            if (!res) {
                console.log('Client is not found');
                return;
            }

            var client = res.toJSON();
            var device = new Device(socket, client, this.io);
            this.devices[serial] = device;
            console.log('Device %s is authenticated', serial);
        });
    }
}