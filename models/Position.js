"use strict";
const sequelize = require("sequelize");
exports.attributes = {
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
};
exports.options = {
    freezeTableName: true,
    tableName: 'positions',
    timestamps: false,
    indexes: [{ fields: ['client_id'], unique: false, method: 'BTREE' },
        { fields: ['date'], unique: false, method: 'BTREE' }]
};
//# sourceMappingURL=Position.js.map