'use strict';

const { Service } = require('@hapipal/schmervice');
const Encrypt = require('@taconet1/encodage');

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

};
