"use strict";
const sequelize = require("sequelize");
exports.attributes = {
    id: { type: sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
    serial: { type: sequelize.STRING, allowNull: false },
    number: { type: sequelize.STRING, allowNull: false },
    ip: { type: sequelize.STRING, allowNull: false },
    port: { type: sequelize.STRING, allowNull: false }
};
exports.options = {
    freezeTableName: true,
    tableName: 'devices',
    timestamps: false,
    indexes: [{ fields: ['serial'], unique: true, method: 'BTREE' }]
};
//# sourceMappingURL=Device.js.map