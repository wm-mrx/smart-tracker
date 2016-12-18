import * as sequelize from 'sequelize';
import { Instance } from './Instance';
import { Model } from './Model';

export interface IClient {
    id: number;
    deviceId: number;
    device?: any;
    passportNo: string;
    firstName: string;
    lastName: string;
    address?: string;
    phone?: string;
    birthDate?: Date;
    birthPlace?: string;
    photoPath?: string;
    registrationDate?: Date;
}

export var attributes: sequelize.DefineAttributes = {
    id: { type: sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
    deviceId: { type: sequelize.STRING, allowNull: false, field: 'device_id' },
    passportNo: { type: sequelize.STRING, allowNull: false, field: 'passport_no' },
    firstName: { type: sequelize.STRING, allowNull: false },
    lastName: { type: sequelize.STRING, allowNull: false },
    address: { type: sequelize.STRING, allowNull: true },
    phone: { type: sequelize.STRING, allowNull: true },
    birthDate: { type: sequelize.DATE, allowNull: true, field: 'birth_date' },
    birthPlace: { type: sequelize.STRING, allowNull: true, field: 'birth_place' },
    photoPath: { type: sequelize.STRING, allowNull: true, field: 'photo_path' },
    registrationDate: { type: sequelize.DATE, allowNull: true, field: 'registration_date' }
}

export var options: sequelize.DefineOptions<Instance<IClient>> = {
    freezeTableName: true,
    tableName: 'clients',
    timestamps: false,
    indexes: [{ fields: ['device_id'], unique: true, method: 'BTREE' }]
}