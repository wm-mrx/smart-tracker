"use strict";
class BaseController {
    constructor(modelName) {
        this.db = global['db'];
        this.models = global['models'];
        this.model = this.models[modelName];
        this.includes = [];
    }
    find(id) {
        return this.model.findById(id);
    }
    findAll(query) {
        var parameter = this.applyQuery(query);
        return this.model.findAll(parameter);
    }
    findAllAndCount(query) {
        var parameter = this.applyQuery(query);
        return this.model.findAndCountAll(parameter);
    }
    save(data) {
        return this.model.insertOrUpdate(data, { validate: true });
    }
    delete(id) {
        return this.model.destroy({ where: { id: id } });
    }
    applyQuery(query) {
        throw 'Not implemented';
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BaseController;
//# sourceMappingURL=BaseController.js.map