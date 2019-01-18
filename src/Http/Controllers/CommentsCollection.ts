import { boundClass } from "autobind-decorator";
import { Request, Response } from "express";
import { injectable } from "inversify";
import { Collection } from "../../Abstracts/Collection";
import { CommentRepository } from "../../Repositories/CommentRepository";
import { MovieRepository } from "../../Repositories/MovieRepository";
import { serializeComment } from "../../serializers";

@injectable()
@boundClass
export class CommentsCollection extends Collection {
    public constructor(
        private readonly commentRepository: CommentRepository,
        private readonly movieRepository: MovieRepository,
    ) {
        super();
    }

    public async get(req: Request, res: Response): Promise<void> {
        const movie = await this.movieRepository.findWithCommentsOrFail(req.params.movieId);

        res.status(200);
        res.json(movie.comments.map(serializeComment));
    }

    public async post(req: Request, res: Response): Promise<void> {
        const movie = await this.movieRepository.findOneOrFail(req.params.movieId);
        const comment = await this.commentRepository.create({
            ...req.body,
            movie,
        });

        res.status(201);
        res.json(serializeComment(comment));
    }
}
