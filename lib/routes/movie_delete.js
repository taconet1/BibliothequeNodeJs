'use strict';

const Joi = require('joi');

module.exports = {
    method: 'delete',
    path: '/movie/{id}',
    options: {
        auth: {
            scope: [ 'admin' ]
        },
        tags: ['api'],
        validate: {
            payload: Joi.object({
                id: Joi.number().integer().greater(0)
            })
        }
    },
    handler: async (request, h) => {

        const { movieService } = request.services();

        return await movieService.delete(request.payload.id);
    }
};