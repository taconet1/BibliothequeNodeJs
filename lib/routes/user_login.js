'use strict';

const Joi = require('joi');

module.exports = {
    method: 'post',
    path: '/user/login',
    options: {
        tags: ['api'],
        validate: {
            payload: Joi.object({
                email: Joi.string().min(8).email().example('johndoe@gmail.com').required(),
                password: Joi.string().min(8).required()
            })
        }
    },
    handler: async (request, h) => {
        const { userService } = request.services();
        return await userService.login(request.payload);
    }
};