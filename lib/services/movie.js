'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class MovieService extends Service {

    async create(movie) {
        const { Movie } = this.server.models();
        const { User } = this.server.models();
        const { mailerService } = this.server.services();

        const emails = await User.knex().raw('SELECT GROUP_CONCAT(email) as emails FROM user').then((emails) => {
            return emails[0][0].emails;
        });
        const newMovie = Movie.query().insertAndFetch(movie).then(( myMovie) => {
            mailerService.sendNotificationNewMovie(emails);
            return myMovie;
        }).catch((error) => { return 'Movie is not created '; });

        return newMovie;
    }

    list() {
        const { Movie } = this.server.models();
        return Movie.query().select();
    }

    delete(id) {
        const { Movie } = this.server.models();
        const success = Movie.query().deleteById(id).then(( succesful) => {
            if (succesful == 1) {
                return '';
            }

            return 'Delete error';
        });

        return success;
    }

    edit(movie) {
        const { Movie } = this.server.models();
        return Movie.query().patchAndFetchById(movie.id, movie);
    }
};
