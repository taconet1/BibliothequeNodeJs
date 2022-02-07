'use strict';

const Joi = require('joi');

module.exports = {
    method: 'post',
    path: '/user',
    options: {
        auth: false,
        tags: ['api'],
        validate: {
            payload: Joi.object({
                firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
                lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user'),
                username: Joi.string().min(3).max(15).lowercase().example('johndoe').description('Username of the user').required(),
                email: Joi.string().min(8).email().example('johndoe@gmail.com').required(),
                password: Joi.string().min(8).required(),
                role: Joi.string().default('user').required()
            })
        }
    },
    handler: async (request, h) => {
        const { userService } = request.services();

        return await userService.create(request.payload);
    }
};