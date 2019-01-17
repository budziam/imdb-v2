import { boundClass } from "autobind-decorator";
import * as bodyParser from "body-parser";
import * as express from "express";
import { Express, Request, Response } from "express";
import { NextFunction } from "express-serve-static-core";
import * as http from "http";
import { Server } from "http";
import { injectable } from "inversify";
import * as winston from "winston";
import { RouteCollection } from "./Abstracts/RouteCollection";
import { ErrorHandler } from "./ErrorHandler";
import { EndpointNotFoundError } from "./Errors/EndpointNotFoundError";

@injectable()
@boundClass
export class AppServer {
    private _app: Express;
    private server: Server;

    public constructor(
        private readonly errorHandler: ErrorHandler,
        private readonly routeCollection: RouteCollection,
        private readonly port: number,
    ) {
        //
    }

    public get app(): Express {
        if (!this._app) {
            this._app = this.prepareApp();
        }

        return this._app;
    }

    public start(): void {
        this.server = this.startServer();
    }

    private prepareApp(): Express {
        const app = express();

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: false}));
        app.use("/", this.routeCollection.getRouter());
        app.use((req, res, next) => next(new EndpointNotFoundError()));
        app.use(this.handleError);

        return app;
    }

    private handleError(
        e: object,
        req: Request,
        res: Response,
        next: NextFunction,
    ): void {
        this.errorHandler.handleHttpError(e, req, res);
        next();
    }

    private startServer(): Server {
        const server = http.createServer(this.app).listen(this.port);

        server.on("listening", () => {
            const address = server.address();
            // @ts-ignore
            winston.debug(`Listening on ${address.address}:${address.port}`);
        });

        server.on("error", this.errorHandler.handle);

        return server;
    }
}
