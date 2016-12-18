import * as sequelize from 'sequelize';
import { Instance } from './Instance';

export interface Model<T> extends sequelize.Model<Instance<T>, T> { }