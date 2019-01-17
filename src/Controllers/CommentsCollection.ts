import { Request, Response } from "express";
import { injectable } from "inversify";

@injectable()
export class CommentsCollection {
    public async get(req: Request, res: Response): Promise<void> {
        //
    }

    public async post(req: Request, res: Response): Promise<void> {
        //
    }
}
