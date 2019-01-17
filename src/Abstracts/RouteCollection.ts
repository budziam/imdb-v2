import { NextFunction, Request, RequestHandler, Response, Router } from "express";
import { injectable } from "inversify";

type ControllerMethod = (req: Request, res: Response) => void;

@injectable()
export abstract class RouteCollection {
    public abstract getRouter(): Router;

    // TODO Make it more generic
    protected wrapControllerMethod(method: ControllerMethod): RequestHandler {
        return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            try {
                await method(req, res);
            } catch (e) {
                next(e);
            }
        };
    }
}