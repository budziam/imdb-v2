import { ValidationError } from "ajv";
import { boundClass } from "autobind-decorator";
import { Request, Response } from "express";
import { injectable } from "inversify";
import * as winston from "winston";
import { EndpointNotFoundError } from "./Errors";

@boundClass
@injectable()
export class ErrorHandler {
    public handle(error: any): void {
        winston.error(error);
    }

    public handleHttpError(e: any, req: Request, res: Response): Response {
        // FIXME Really shitty hack
        if (e === "ok") {
            return undefined;
        }

        if (e instanceof EndpointNotFoundError) {
            return res.sendStatus(404);
        }

        if (e instanceof ValidationError) {
            res.status(422);

            return res.send({
                message: e.message,
                errors: e.errors,
            });
        }

        return res.sendStatus(500);
    }
}
