import * as net from 'net';
import * as http from 'http';
import * as socketio from 'socket.io';

export default class Server {
    io: SocketIO.Server;
   
    startDevice(ports: number[]): void {
        ports.forEach(port => {
            var server = net.createServer((socket) => {

            });

            server.listen(port);
        });
    }

    startClient(app, port): void {
        var server = http.createServer(app);
        this.io = socketio(server);

        this.io.on('connection', (socket) => {

        });

        server.listen(port);
    }
}