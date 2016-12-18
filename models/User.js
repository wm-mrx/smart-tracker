"use strict";
const sequelize = require("sequelize");
exports.attributes = {
    id: { type: sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
    name: { type: sequelize.STRING, allowNull: false },
    userName: { type: sequelize.STRING, allowNull: false, field: 'user_name' },
    hash: { type: sequelize.STRING, allowNull: false },
    salt: { type: sequelize.STRING, allowNull: false }
};
exports.options = {
    freezeTableName: true,
    tableName: 'users',
    timestamps: false,
    indexes: [{ fields: ['user_name'], unique: true, method: 'BTREE' }]
};
//# sourceMappingURL=User.js.map