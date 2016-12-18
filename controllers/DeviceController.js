"use strict";
const BaseController_1 = require("./BaseController");
class DeviceController extends BaseController_1.default {
    constructor() {
        super('Device');
    }
    findBySerial(serial) {
        return this.model.findOne({ where: { serial: serial }, include: this.includes });
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
exports.default = new DeviceController();
//# sourceMappingURL=DeviceController.js.map