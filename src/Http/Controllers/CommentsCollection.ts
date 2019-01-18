import { boundClass } from "autobind-decorator";
import { Request, Response } from "express";
import { injectable } from "inversify";
import { Collection } from "../../Abstracts/Collection";

@injectable()
@boundClass
export class CommentsCollection extends Collection {
    public async get(req: Request, res: Response): Promise<void> {
        //
    }

    public async post(req: Request, res: Response): Promise<void> {
        //
    }
}
