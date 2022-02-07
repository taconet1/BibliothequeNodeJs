'use strict';

const Joi = require('joi').extend(require('@joi/date'));

module.exports = {
    method: 'post',
    path: '/movie/{id}',
    options: {
        auth: {
            scope: [ 'admin' ]
        },
        tags: ['api'],
        validate: {
            payload: Joi.object({
                id: Joi.number().integer().greater(0),
                title: Joi.string().min(3).example('My new movie').description('Title of the movie').required(),
                description: Joi.string().max(1500).example('This is my movie description').description('Description of the movie'),
                director: Joi.string().min(3).example('Johny Depp').description('Name of the director'),
                releasedAt: Joi.date().format('YYYY-MM-DD').example('1991-01-01').description('Released date of the movie').required()
            })
        }
    },
    handler: async (request, h) => {
        const { movieService } = request.services();

        return await movieService.edit(request.payload);
    }
};