import * as sequelize from 'sequelize';
import { Instance } from './Instance';
import { Model } from './Model';

export interface IPosition {
    id: number;
    clientId: number;
    latitude: number;
    longitude: number;
    speed?: number;
    transmissionMode?: string;
    positioningMode?: string;
    positioningType?: string;
    batteryLevel?: number;
    direction?: number;
    signalQuality?: number;
    date: Date;
}

export var attributes: sequelize.DefineAttributes = {
    id: { type: sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
    clientId: { type: sequelize.BIGINT, allowNull: false, field: 'client_id' },
    latitude: { type: sequelize.DOUBLE, allowNull: false },
    longitude: { type: sequelize.DOUBLE, allowNull: false },
    speed: { type: sequelize.DOUBLE, allowNull: true },
    transmissionMode: { type: sequelize.STRING, allowNull: true, field: 'transmission_mode' },
    positioningMode: { type: sequelize.STRING, allowNull: true, field: 'positioning_mode' },
    positioningType: { type: sequelize.STRING, allowNull: true, field: 'positioning_type' },
    batteryLevel: { type: sequelize.DOUBLE, allowNull: true, field: 'battery_level' },
    direction: { type: sequelize.DOUBLE, allowNull: true },
    signalQuality: { type: sequelize.DOUBLE, allowNull: true, field: 'signal_quality' },
    date: { type: sequelize.DATE, allowNull: false }
}

export var options: sequelize.DefineOptions<Instance<IPosition>> = {
    freezeTableName: true,
    tableName: 'positions',
    timestamps: false,
    indexes: [{ fields: ['client_id'], unique: false, method: 'BTREE' },
    { fields: ['date'], unique: false, method: 'BTREE' }]
}