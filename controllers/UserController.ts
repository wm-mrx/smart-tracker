import * as sequelize from 'sequelize';
import * as crypto from 'crypto';
import { IUser } from '../models/User';
import { Instance } from '../models/Instance';
import BaseController from './BaseController';

class UserController extends BaseController<IUser>{
    constructor() {
        super('User');
    }

    authenticate(userName: string, password: string): Promise<IUser> {
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

    save(data: any): Promise<boolean> {
        if (data['password']) {
            data['salt'] = crypto.randomBytes(16).toString('base64');
            data['hash'] = crypto.createHmac('sha256', data['salt']).update(data['password']).digest('hex');
        }

        return this.model.insertOrUpdate(data, { validate: true });
    }

    applyQuery(query: any): any {
        var where: sequelize.WhereOptions = {};
        var options: sequelize.FindOptions = { where: where, include: this.includes };

        if (query['limit'] && query['skip']) {
            options.limit = query['limit'];
            options.offset = query['skip'];
        }

        return options;
    }
}

export default new UserController();