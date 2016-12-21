"use strict";
const BaseController_1 = require("./BaseController");
class PositionController extends BaseController_1.default {
    constructor() {
        super('Position');
        this.includes.push({ model: this.models.Client, as: 'client' });
    }
    findByClient(clientId) {
        return this.model.findAll({ where: { clientId: clientId }, include: this.includes });
    }
    findLatestByClient(clientId) {
        return this.model.findOne({ where: { clientId: clientId }, include: this.includes, order: [['id', 'DESC']] });
    }
    saveNotStationary(data) {
        return this.db.transaction((t) => {
            return this.model.findOne({ where: { latitude: data.latitude, longitude: data.longitude }, transaction: t }).then(res => {
                if (res)
                    return false;
                return this.model.insertOrUpdate(data, { transaction: t });
            });
        });
    }
    applyQuery(query) {
        var where = {};
        var options = { where: where, include: this.includes };
        if (query['clientId'])
            where['clientId'] = query['clientId'];
        if (query['from'] && query['to'])
            where['date'] = { $between: [new Date(query['from']), new Date(query['to'])] };
        if (query['limit'] && query['skip']) {
            options.limit = query['limit'];
            options.offset = query['skip'];
        }
        return options;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new PositionController();
//# sourceMappingURL=PositionController.js.map