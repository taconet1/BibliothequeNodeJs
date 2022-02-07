'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class MovieService extends Service {

    create(movie) {
        const { Movie } = this.server.models();
        // const { mailerService } = this.server.services(); TODO

        const newMovie = Movie.query().insertAndFetch(movie).then(( myMovie) => {
            // mailerService.send(myUser.email);
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
