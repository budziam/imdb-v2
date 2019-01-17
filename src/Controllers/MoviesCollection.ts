import { Request, Response } from "express";
import { injectable } from "inversify";

@injectable()
export class MoviesCollection {
    public async get(req: Request, res: Response): Promise<void> {
        res.status(200);
        res.send([
            {
                id: "test",
            },
        ]);
    }

    public async post(req: Request, res: Response): Promise<void> {
        res.status(201);
        res.send({
            id: "test",
        });
    }
}
