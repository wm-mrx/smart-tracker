"use strict";
const BaseController_1 = require("./BaseController");
class ClientController extends BaseController_1.default {
    constructor() {
        super('Client');
        this.includes.push({ model: this.models.Device, as: 'device' });
    }
    findByDeviceSerial(serial) {
        return this.db.transaction((t) => {
            return this.models.Device.findOne({ where: { serial: serial }, transaction: t }).then(res => {
                if (!res)
                    return null;
                var device = res.toJSON();
                return this.model.findOne({ where: { deviceId: device.id }, include: this.includes, transaction: t });
            });
        });
    }
    applyQuery(query) {
        var where = {};
        var options = { where: where, include: this.includes };
        if (query['limit'] && query['skip']) {
            options.limit = query['limit'];
            options.offset = query['skip'];
        }
        return options;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new ClientController();
//# sourceMappingURL=ClientController.js.map