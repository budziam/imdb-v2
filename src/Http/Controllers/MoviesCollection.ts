import { boundClass } from "autobind-decorator";
import { Request, Response } from "express";
import { injectable } from "inversify";
import { Collection } from "../../Abstracts/Collection";
import { Movie } from "../../Entities/Movie";
import { MovieRepository } from "../../Repositories/MovieRepository";
import { MovieService } from "../../Services/MoveService";

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

        // TODO Implement serializations
        res.status(200);
        res.send(movies.map((movie) => this.serializeMovie(movie)));
    }

    public async post(req: Request, res: Response): Promise<void> {
        const movie = await this.movieService.create(req.body.title);

        res.status(201);
        res.send(this.serializeMovie(movie));
    }

    private serializeMovie(movie: Movie): object {
        return {
            id: movie.id,
            title: movie.title,
            year: movie.year,
            released: movie.released,
            plot: movie.plot,
        };
    }
}
