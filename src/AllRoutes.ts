import { Router } from "express";
import { Container, injectable } from "inversify";
import { RouteCollection } from "./Abstracts/RouteCollection";
import { CommentsCollection, MoviesCollection } from "./Controllers";

@injectable()
export class AllRoutes extends RouteCollection {
    public constructor(private readonly container: Container) {
        super();
    }

    public getRouter(): Router {
        const router = Router();

        const moviesCollection = this.container.get<MoviesCollection>(MoviesCollection);
        const commentsCollection = this.container.get<CommentsCollection>(CommentsCollection);

        router.get("/movies", this.wrapControllerMethod(moviesCollection.get));
        router.post("/movies", this.wrapControllerMethod(moviesCollection.post));
        router.get("/comments", this.wrapControllerMethod(commentsCollection.get));
        router.post("/comments", this.wrapControllerMethod(commentsCollection.post));

        return router;
    }
}
