import { boundClass } from "autobind-decorator";
import { Response } from "express";
import { injectable } from "inversify";
import * as winston from "winston";
import { EndpointNotFoundError } from "./Errors/EndpointNotFoundError";

@boundClass
@injectable()
export class ErrorHandler {
    public handle(error: any): void {
        winston.error(error);
    }

    public handleHttpError(e: any, req: any, res: any): Response {
        // TODO Really shitty hack
        if (e === "ok") {
            return undefined;
        }

        if (e instanceof EndpointNotFoundError) {
            return res.sendStatus(404);
        }

        return res.sendStatus(500);
    }
}
