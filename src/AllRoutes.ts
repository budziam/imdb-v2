import { Router } from "express";
import { Container, injectable } from "inversify";
import { RouteCollection } from "./Abstracts/RouteCollection";
import { CommentsCollection, MoviesCollection } from "./Http/Controllers";
import { SchemaValidator } from "./Http/Validators";
import { postCommentsCollection, postMoviesCollection } from "./Http/Validators/schemas";

@injectable()
export class AllRoutes extends RouteCollection {
    public constructor(protected readonly container: Container) {
        super(container);
    }

    public getRouter(): Router {
        const router = Router();

        router.get(
            "/movies",
            this.validation(new SchemaValidator({})),
            this.collection(MoviesCollection),
        );

        router.post(
            "/movies",
            this.validation(new SchemaValidator(postMoviesCollection)),
            this.collection(MoviesCollection),
        );

        router.get(
            "/movies/:movieId/comments",
            this.validation(new SchemaValidator({})),
            this.collection(CommentsCollection),
        );

        router.post(
            "/movies/:movieId/comments",
            this.validation(new SchemaValidator(postCommentsCollection)),
            this.collection(CommentsCollection),
        );

        return router;
    }
}
