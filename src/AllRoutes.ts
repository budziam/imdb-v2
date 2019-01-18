import { Router } from "express";
import { Container, injectable } from "inversify";
import { RouteCollection } from "./Abstracts/RouteCollection";
import { CommentsCollection, MoviesCollection } from "./Http/Controllers";
import { BodySchemaValidator } from "./Http/Validators";
import {
    getMoviesCollection,
    postCommentsCollection,
    postMoviesCollection
} from "./Http/Validators/schemas";
import { QuerySchemaValidator } from "./Http/Validators/QuerySchemaValidator";

@injectable()
export class AllRoutes extends RouteCollection {
    public constructor(protected readonly container: Container) {
        super(container);
    }

    public getRouter(): Router {
        const router = Router();

        router.get(
            "/movies",
            this.validation(new QuerySchemaValidator(getMoviesCollection)),
            this.collection(MoviesCollection),
        );

        router.post(
            "/movies",
            this.validation(new BodySchemaValidator(postMoviesCollection)),
            this.collection(MoviesCollection),
        );

        router.get(
            "/movies/:movieId/comments",
            this.collection(CommentsCollection),
        );

        router.post(
            "/movies/:movieId/comments",
            this.validation(new BodySchemaValidator(postCommentsCollection)),
            this.collection(CommentsCollection),
        );

        return router;
    }
}
