import * as sequelize from 'sequelize';
import { Instance } from './Instance';
import { Model } from './Model';

export interface IDevice {
    id: number;
    serial: string;
    number: string;
    ip: string;
    port: string;
}

export var attributes: sequelize.DefineAttributes = {
    id: { type: sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
    serial: { type: sequelize.STRING, allowNull: false },
    number: { type: sequelize.STRING, allowNull: false },
    ip: { type: sequelize.STRING, allowNull: false },
    port: { type: sequelize.STRING, allowNull: false }
}

export var options: sequelize.DefineOptions<Instance<IDevice>> = {
    freezeTableName: true,
    tableName: 'devices',
    timestamps: false,
    indexes: [{ fields: ['serial'], unique: true, method: 'BTREE' }]
}
