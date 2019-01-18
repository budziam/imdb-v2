import { boundClass } from "autobind-decorator";
import { Request, Response } from "express";
import { injectable } from "inversify";
import { Collection } from "../../Abstracts/Collection";
import { Movie } from "../../Entities";
import { MovieRepository } from "../../Repositories/MovieRepository";
import { MovieService } from "../../Services/MoveService";
import { OmdbError } from "../../Errors/OmdbError";
import { serializeMovie } from "../../serializers";

@injectable()
@boundClass
export class MoviesCollection extends Collection {
    public constructor(
        private readonly movieRepository: MovieRepository,
        private readonly movieService: MovieService,
    ) {
        super();
    }

    public async get(req: Request, res: Response): Promise<void> {
        // TODO Implement validation
        const skip = req.query.offset || 0;
        const take = Math.min(req.query.limit || 50, 50);

        const movies = await this.movieRepository.list({skip, take});

        res.status(200);
        res.json(movies.map(serializeMovie));
    }

    public async post(req: Request, res: Response): Promise<void> {
        let movie: Movie;
        try {
            movie = await this.movieService.create(req.body.title);
        } catch (e) {
            if (e instanceof OmdbError) {
                res.status(424);
                res.json();
            }

            throw e;
        }

        res.status(201);
        res.json(serializeMovie(movie));
    }
}
