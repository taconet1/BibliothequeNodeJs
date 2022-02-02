'use strict';

const { Service } = require('@hapipal/schmervice');
const Encrypt = require('@taconet1/encodage');
const Boom = require('@hapi/boom');

module.exports = class UserService extends Service {

    create(user) {
        const { User } = this.server.models();
        return User.query().insertAndFetch(user);
    }

    list() {
        const { User } = this.server.models();
        return User.query().select();
    }

    delete(id) {
        const { User } = this.server.models();
        const success = User.query().deleteById(id);
        if (success === 1) {
            return '';
        }

        return 'Delete error';
    }

    edit(user) {
        const { User } = this.server.models();
        return User.query().patchAndFetchById(user.id, user);
    }

    async login(user) {
        const { User } = this.server.models();

        const success = await User.query().findOne({
            email: user.email,
            password: Encrypt.sha1(user.password)
        });
        if (success) {
            return { login: 'successful' };
        }

        throw Boom.unauthorized('Authentication failed');
    }
};
