'use strict';

module.exports = {
    method: 'get',
    path: '/favorites',
    options: {
        auth: {
            scope: ['user']
        },
        tags: ['api']
    },
    handler: async (request, h) => {
        const { favoriteService } = request.services();
        const email = request.auth.credentials.email;

        return await favoriteService.list(email);
    }
};
