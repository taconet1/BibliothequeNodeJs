'use strict';

const Joi = require('joi');

module.exports = {
    method: 'delete',
    path: '/user/{id}',
    options: {
        tags: ['api'],
        validate: {
            payload: Joi.object({
                id: Joi.number().integer().greater(0)
            })
        }
    },
    handler: async (request, h) => {

        const { userService } = request.services();

        return await userService.delete(request.payload.id);
    }
};