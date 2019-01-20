import { injectable } from "inversify";
import { Movie } from "../Entities";
import { OmdbMovie, OmdbRequester } from "../OmdbRequester";
import { MovieRepository } from "../Repositories/MovieRepository";
import { OmdbError } from "../Errors";

@injectable()
export class MovieService {
    public constructor(
        private readonly movieRepository: MovieRepository,
        private readonly omdbRequester: OmdbRequester,
    ) {
        //
    }

    /**
     * @throws {OmdbError}
     * @throws {AlreadyExistsError}
     */
    public async create(title: string): Promise<Movie> {
        let omdbMovie: OmdbMovie;
        try {
            omdbMovie = await this.omdbRequester.findByTitle(title);
        } catch (e) {
            // TODO Maybe we should implement some repetition with a backoff
            throw new OmdbError("Could not find a movie");
        }

        return this.movieRepository.createOrFail({
            title,
            year: parseInt(omdbMovie.Year),
            released: omdbMovie.Released,
            plot: omdbMovie.Plot,
        });
    }
}
