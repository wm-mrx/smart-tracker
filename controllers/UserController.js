"use strict";
const crypto = require("crypto");
const BaseController_1 = require("./BaseController");
class UserController extends BaseController_1.default {
    constructor() {
        super('User');
    }
    authenticate(userName, password) {
        return this.model.findOne({ where: { userName: userName } }).then(res => {
            if (!res)
                throw new Error('User is not found');
            var user = res.toJSON();
            var hash = user.hash;
            var currentHash = crypto.createHmac('sha256', user.salt).update(password).digest('hex');
            if (hash !== currentHash)
                throw new Error('Password is not found');
            return user;
        });
    }
    save(data) {
        if (data['password']) {
            data['salt'] = crypto.randomBytes(16).toString('base64');
            data['hash'] = crypto.createHmac('sha256', data['salt']).update(data['password']).digest('hex');
        }
        return this.model.insertOrUpdate(data, { validate: true });
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
exports.default = new UserController();
//# sourceMappingURL=UserController.js.map