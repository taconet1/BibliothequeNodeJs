'use strict';

module.exports = {
    method: 'get',
    path: '/users',
    options: {
        tags: ['api']
    },
    handler: async (request, h) => {

        const { User } = request.models();

        const users = await User.query().select();

        return users;
    }
};
