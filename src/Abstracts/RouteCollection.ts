import { NextFunction, Request, RequestHandler, Response, Router } from "express";
import { Container, interfaces } from "inversify";
import { Collection } from "./Collection";
import { Validator } from "./Validator";
import Newable = interfaces.Newable;

export abstract class RouteCollection {
    public constructor(protected readonly container: Container) {
        //
    }

    public abstract getRouter(): Router;

    protected validation(validator: Validator): RequestHandler {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                await validator.validate(req, res);
                next();
            } catch (e) {
                next(e);
            }
        };
    }

    protected collection(className: Newable<Collection>): RequestHandler {
        return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            try {
                const controller: Collection = this.container.get<Collection>(className);

                if (req.method === "GET") {
                    await controller.get(req, res);
                } else if (req.method === "POST") {
                    await controller.post(req, res);
                }

                next("ok");
            } catch (e) {
                next(e);
            }
        };
    }
}
