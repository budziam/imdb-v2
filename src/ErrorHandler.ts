import { boundClass } from "autobind-decorator";
import { injectable } from "inversify";
import * as winston from "winston";

@boundClass
@injectable()
export class ErrorHandler {
    public handle(error: any): void {
        winston.error(error);
    }
}
