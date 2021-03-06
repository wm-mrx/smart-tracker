﻿import * as net from 'net';
import { IPosition } from '../models/Position';
import { IClient } from '../models/Client';
import { INotification } from '../models/Notification';
import PositionController from '../controllers/PositionController';
import NotificationController from '../controllers/NotificationController';

interface ICommand {
    serial: string;
    state: string;
    messages: any[];
}

export default class Device {
    socket: net.Socket;
    io: SocketIO.Server;
    client: IClient;
    state: any;
    positioningType: any;

    constructor(socket, client, io) {
        this.socket = socket;
        this.io = io;
        this.client = client;

        this.state = {
            handshake: '#@H00@#',
            gps: '#@H02@#',
            lbs: '#@H03@#',
            syncDevice: '#@H01@#',
            syncTime: '#@H20@#',
            syncSms: '#@H06@#',
            terminalHeartRate: '#@H10@#',
            transmitWifiData: '#@H14@#',
            lowBattery: '#@H05@#'
        }

        this.positioningType = {
            0: 'First positioning',
            1: 'Cycle positioning',
            2: 'Active positioning',
            3: 'SOS positioning',
            4: 'Get position info',
            5: 'Fixed positining',
            6: 'Realtime positining',
            7: 'Shake for positioning',
            8: 'Watch removal alert',
            9: 'Photo take positioning'
        }
    }

    onDataReceived(data): void {
        console.log('Device has sent %s', data.toString());

        var command = this.parse(data);

        switch (command.state) {
            case this.state.handshake:
                this.onHandshake(command);
                break;
            case this.state.gps:
                this.onGps(command);
                break;
            case this.state.lbs:
                this.onLbs(command);
                break;
            case this.state.syncDevice:
                this.onLinkOk(command);
                break;
            case this.state.syncSms:
                this.onSmsOk(command);
                break;
            case this.state.syncTime:
                this.onSyncTime(command);
                break;
            case this.state.terminalHeartRate:
                this.onLinkOk(command);
                break;
            case this.state.transmitWifiData:
                this.onLinkOk(command);
                break;
            case this.state.lowBattery:
                this.onLowBattery(command);
                break;
            default:
                this.socket.emit('log error', 'Command is not found');
        }
    }

    onHandshake(command: ICommand): void {
        var replyCommand = 'ServiceIP:' + this.client.device.ip + ',' + this.client.device.port + ';'
            + String.fromCharCode(0x01, 0x01, 0x01);

        this.socket.write(replyCommand);
        console.log('Server has sent %s', replyCommand);
    }

    onLinkOk(command: ICommand): void {
        var replyCommand = 'Link:OK' + String.fromCharCode(0x01, 0x01, 0x01);
        this.socket.write(replyCommand);
        console.log('Server has sent %s', replyCommand);
    }

    onSmsOk(command: ICommand): void {
        var replyCommand = 'SMS:OK' + String.fromCharCode(0x01, 0x01, 0x01);
        this.socket.write(replyCommand);
        console.log('Server has sent %s', replyCommand);
    }

    onSyncTime(command: ICommand): void {
        var date = new Date();

        var replyCommand = 'Time:' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
            + ',' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ';' + String.fromCharCode(0x01, 0x01, 0x01);

        this.socket.write(replyCommand);
        console.log('Server has sent %s', replyCommand);
    }

    onGps(command: ICommand): void {
        var body = command.messages;
        var latSign = body[7].split('N').length > 1 ? 'N' : 'S';
        var lngSign = body[8].split('E').length > 1 ? 'E' : 'W';

        var latitude = latSign === 'N' ? parseFloat(body[7].split('N')[1])
            : parseFloat(body[7].split('S')[1]) * -1;

        var longitude = lngSign === 'E' ? parseFloat(body[8].split('E')[1])
            : parseFloat(body[8].split('W')[1]) * -1;

        var position: IPosition = {
            id: null,
            clientId: this.client.id,
            latitude: latitude,
            longitude: longitude,
            speed: body[9] === '' ? 0 : parseFloat(body[9]),
            transmissionMode: body[6] === 0 ? 'Realtime' : 'Delayed',
            positioningMode: body[5] === 'G' ? 'GPS' : body[5] === 'L' ? 'LBS' : 'Wifi',
            batteryLevel: parseInt(body[12]) / 100,
            direction: body[10] === '' ? 0 : parseFloat(body[10]),
            positioningType: this.positioningType[body[14]],
            signalQuality: body[13] === '' ? parseFloat(body[13]) : 0,
            date: new Date(body[2] + ' ' + body[3])
        };

        PositionController.saveNotStationary(position).then(res => {
            this.onLinkOk(command);
            this.io.emit('update position', position);
        });
    }

    onLbs(command: ICommand): void {

    }
    
    onLowBattery(command: ICommand): void {
        var notification: INotification = {
            id: null,
            clientId: this.client.id,
            date: new Date(),
            message: 'Low battery alert',
            type: 'lowBattery'
        }

        NotificationController.save(notification).then(res => {
            this.onLinkOk(command);
            this.io.emit('notify', notification);
        });
    }

    onPositioning(): void {
        var code = '#@H13@#';
        var dt = new Date();
        var year = dt.getFullYear();
        var month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : (dt.getMonth() + 1);
        var date = dt.getDate();
        var hour = dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours();
        var min = dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes();
        var second = dt.getSeconds() < 10 ? '0' + dt.getSeconds() : dt.getSeconds();
        var fullDate = year + '-' + month + '-' + date;
        var time = hour + ':' + min + ':' + second;
        
        var body = this.client.device.serial + ';' + this.client.device.imsi + ';000000;'
            + fullDate + ';' + time + ';Reply;8;5080;';

        var verificationCode = this.generateVerificationCode(body);
        var command = code + ';' + body + verificationCode + ';' + String.fromCharCode(0x01);

        this.socket.write(body);
    }

    getLastPosition(): void {
        PositionController.findLatestByClient(this.client.id).then(res => {
            if (!res)
                return;

            var position = res.toJSON();
            this.io.emit('update position', position);
        });
    }

    parse(data: any): ICommand {
        var commands = data.toString().split(';');

        return {
            state: commands[0],
            serial: commands[1],
            messages: commands.slice(2, commands.length - 1)
        }
    }

    generateVerificationCode(command: string): any {
        var characters = command.split('');
        var total = 0

        for (var i = 0; i < characters.length; i++)
            total += characters[i].charCodeAt(null);

        total %= 100;
        total -= 100;

        if (total < 0)
            return '0x2d0x' + Math.abs(total).toString(16);

        return '0x' + (total - 100).toString(16);
    }
}