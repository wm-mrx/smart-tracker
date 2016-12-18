"use strict";
const sequelize = require("sequelize");
exports.attributes = {
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
};
exports.options = {
    freezeTableName: true,
    tableName: 'clients',
    timestamps: false,
    indexes: [{ fields: ['device_id'], unique: true, method: 'BTREE' }]
};
//# sourceMappingURL=Client.js.map