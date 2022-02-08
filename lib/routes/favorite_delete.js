'use strict';

const Joi = require('joi');

module.exports = {
    method: 'delete',
    path: '/favorite/{id}',
    options: {
        auth: {
            scope: [ 'user' ]
        },
        tags: ['api'],
        validate: {
            payload: Joi.object({
                id_movie: Joi.number().integer().greater(0)
            })
        }
    },
    handler: async (request, h) => {
        const { favoriteService } = request.services();
        const email = request.auth.credentials.email;

        return await favoriteService.delete(request.payload.id_movie, email);
    }
};