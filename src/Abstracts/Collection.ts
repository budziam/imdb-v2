import { Request, Response } from "express";
import { EndpointNotFoundError } from "../Errors";

export abstract class Collection {
    public async get(req: Request, res: Response): Promise<void> {
        throw new EndpointNotFoundError();
    }

    public async post(req: Request, res: Response): Promise<void> {
        throw new EndpointNotFoundError();
    }
}
