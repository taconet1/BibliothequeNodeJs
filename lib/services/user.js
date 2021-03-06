'use strict';

const { Service } = require('@hapipal/schmervice');
const Encrypt = require('@taconet1/encodage');
const Boom = require('@hapi/boom');
const Jwt = require('@hapi/jwt');


module.exports = class UserService extends Service {

    create(user) {
        const { User } = this.server.models();
        const { mailerService } = this.server.services();

        const newUser = User.query().insertAndFetch(user).then(( myUser) => {
            mailerService.send(myUser.email);
            return myUser;
        }).catch((error) => { return 'User is not created'; });

        return newUser;
    }

    list() {
        const { User } = this.server.models();
        return User.query().select();
    }

    delete(id) {
        const { User } = this.server.models();
        const success = User.query().deleteById(id).then(( succesful) => {
            if (succesful == 1) {
                return '';
            }

            return 'Delete error';
        });

        return success;
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
            const token = Jwt.token.generate(
                {
                    aud: 'urn:audience:iut',
                    iss: 'urn:issuer:iut',
                    firstName: success.firstName,
                    lastName: success.lastName,
                    email: success.email,
                    scope: success.role
                },
                {
                    key: 'random_string', // La clé qui est définit dans lib/auth/strategies/jwt.js
                    algorithm: 'HS512'
                },
                {
                    ttlSec: 14400 // 4 hours
                }
            );

            return { login: 'Bearer ' + token };
        }

        throw Boom.unauthorized('Authentication failed');
    }
};
