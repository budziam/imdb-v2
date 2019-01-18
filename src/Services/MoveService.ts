import { injectable } from "inversify";
import { Movie } from "../Entities";
import { OmdbRequester } from "../OmdbRequester";
import { MovieRepository } from "../Repositories/MovieRepository";

@injectable()
export class MovieService {
    public constructor(
        private readonly movieRepository: MovieRepository,
        private readonly omdbRequester: OmdbRequester,
    ) {
        //
    }

    public async create(title: string): Promise<Movie> {
        const omdbMovie = await this.omdbRequester.findByTitle(title);

        return this.movieRepository.create({
            title,
            year: parseInt(omdbMovie.Year),
            released: omdbMovie.Released,
            plot: omdbMovie.Plot,
        });
    }
}
