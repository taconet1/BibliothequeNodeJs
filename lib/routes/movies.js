'use strict';

module.exports = {
    method: 'get',
    path: '/movies',
    options: {
        auth: {
            scope: ['admin', 'user']
        },
        tags: ['api']
    },
    handler: async (request, h) => {

        const { movieService } = request.services();

        return await movieService.list();
    }
};
