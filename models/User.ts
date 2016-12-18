import * as sequelize from 'sequelize';
import { Instance } from './Instance';
import { Model } from './Model';

export interface IUser {
    id: number;
    name: string;
    userName: string;
    hash: string;
    salt: string;
}

export var attributes: sequelize.DefineAttributes = {
    id: { type: sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
    name: { type: sequelize.STRING, allowNull: false },
    userName: { type: sequelize.STRING, allowNull: false, field: 'user_name' },
    hash: { type: sequelize.STRING, allowNull: false },
    salt: { type: sequelize.STRING, allowNull: false }
}

export var options: sequelize.DefineOptions<Instance<IUser>> = {
    freezeTableName: true,
    tableName: 'users',
    timestamps: false,
    indexes: [{ fields: ['user_name'], unique: true, method: 'BTREE' }]
}