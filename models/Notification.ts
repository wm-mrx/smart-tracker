import * as sequelize from 'sequelize';
import { Instance } from './Instance';
import { Model } from './Model';

export interface INotification {
    id: number;
    clientId: number;
    client?: any;
    message: string;
    type: string;
    date: Date;
}

export var attributes: sequelize.DefineAttributes = {
    id: { type: sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
    clientId: { type: sequelize.BIGINT, allowNull: false, field: 'client_id' },
    message: { type: sequelize.STRING, allowNull: false },
    date: { type: sequelize.DATE, allowNull: false }
}

export var options: sequelize.DefineOptions<Instance<INotification>> = {
    freezeTableName: true,
    tableName: 'notifications',
    timestamps: false,
    indexes: [{ fields: ['client_id'], unique: true, method: 'BTREE' }]
}