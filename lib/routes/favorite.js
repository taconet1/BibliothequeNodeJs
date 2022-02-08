'use strict';

const Joi = require('joi').extend(require('@joi/date'));

module.exports = {
    method: 'post',
    path: '/favorite',
    options: {
        auth: {
            scope: [ 'user' ]
        },
        tags: ['api'],
        validate: {
            payload: Joi.object({
                id: Joi.number().integer().greater(0).description('Id of the movie')
            })
        }
    },
    handler: async (request, h) => {
        const { favoriteService } = request.services();
        const email = request.auth.credentials.email;

        return await favoriteService.create(request.payload.id, email);
    }
};