import * as net from 'net';

export default class Device {
    socket: net.Socket;
    io: SocketIO.Server;

    constructor(socket, io) {
        this.socket = socket;
        this.io = io;
    }
}