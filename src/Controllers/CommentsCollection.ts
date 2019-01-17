import { boundClass } from "autobind-decorator";
import { Request, Response } from "express";
import { injectable } from "inversify";

@injectable()
@boundClass
export class CommentsCollection {
    public async get(req: Request, res: Response): Promise<void> {
        //
    }

    public async post(req: Request, res: Response): Promise<void> {
        //
    }
}
