'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');


module.exports = class FavoriteService extends Service {

    async create(id, email) {
        const { Movie } = this.server.models();
        const { Favorite } = this.server.models();
        const { User } = this.server.models();
        const userId = await User.query().findOne({ email: email }).then((user) => {
            return user.id;
        });
        const movieId = await Movie.query().findById(id).then((movie) => {
            return movie.id;
        }).catch((error) => {
            throw Boom.notFound('Movie missing');
        });
        const favorite = Favorite.query().insert({ id_user: userId, id_movie: movieId }).then((favorite) => {
            return favorite;
        }).catch((error) => {
            throw Boom.badRequest('Favorite already existed');
        });
        return favorite;
    }

    async list(email) {
        const { User } = this.server.models();
        const userId = await User.query().findOne({ email: email }).then((user) => {
            return user.id;
        });
        const { Favorite } = this.server.models();
        return Favorite.query().select('id_movie').where({ id_user: userId });
    }

    async delete(id, email) {
        const { User } = this.server.models();
        const { Favorite } = this.server.models();

        const userId = await User.query().findOne({ email: email }).then((user) => {
            return user.id;
        });
        const success = Favorite.query().del().where({ id_user: userId, id_movie: id }).then(( succesful) => {
            if (succesful === 1) {
                return 'Favorite removed';
            }

            throw Boom.notFound('Favorite does not exist');
        });

        return success;
    }
};
