'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');
const Encrypt = require('@taconet1/encodage');


module.exports = class User extends Model {

    static get tableName() {

        return 'user';
    }

    static get jsonAttributes() {

        return ['scope'];
    }


    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            firstName: Joi.string().min(3).example('John').description('Firstname of the user').required(),
            lastName: Joi.string().min(3).example('Doe').description('Lastname of the user').required(),
            createdAt: Joi.date(),
            updatedAt: Joi.date(),
            username: Joi.string().min(3).max(15).lowercase().example('johndoe').description('Username of the user').required(),
            email: Joi.string().min(8).email().example('johndoe@gmail.com').required(),
            password: Joi.string().min(8).required(),
            role: Joi.string().default('user').required()
        });
    }

    $beforeInsert(queryContext) {
        this.password = Encrypt.sha1(this.password);
        this.role = this.role === 'admin' ? 'admin' : 'user';
        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
    }

    $beforeUpdate(opt, queryContext) {
        this.password = Encrypt.sha1(this.password);
        this.updatedAt = new Date();
    }

};