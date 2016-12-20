"use strict";
const sequelize = require("sequelize");
exports.attributes = {
    id: { type: sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
    clientId: { type: sequelize.BIGINT, allowNull: false, field: 'client_id' },
    message: { type: sequelize.STRING, allowNull: false },
    date: { type: sequelize.DATE, allowNull: false }
};
exports.options = {
    freezeTableName: true,
    tableName: 'notifications',
    timestamps: false,
    indexes: [{ fields: ['client_id'], unique: true, method: 'BTREE' }]
};
//# sourceMappingURL=Notification.js.map