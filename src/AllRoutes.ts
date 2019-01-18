import { Router } from "express";
import { Container, injectable } from "inversify";
import { RouteCollection } from "./Abstracts/RouteCollection";
import { CommentsCollection, MoviesCollection } from "./Http/Controllers";
import {
    GetCommentsCollectionValidator,
    GetMoviesCollectionValidator,
    PostCommentsCollectionValidator,
    PostMoviesCollectionValidator,
} from "./Http/Validators";

@injectable()
export class AllRoutes extends RouteCollection {
    public constructor(protected readonly container: Container) {
        super(container);
    }

    public getRouter(): Router {
        const router = Router();

        router.get(
            "/movies",
            this.validation(GetMoviesCollectionValidator),
            this.collection(MoviesCollection),
        );

        router.post(
            "/movies",
            this.validation(PostMoviesCollectionValidator),
            this.collection(MoviesCollection),
        );

        router.get(
            "/comments",
            this.validation(GetCommentsCollectionValidator),
            this.collection(CommentsCollection),
        );

        router.post(
            "/comments",
            this.validation(PostCommentsCollectionValidator),
            this.collection(CommentsCollection),
        );

        return router;
    }
}
