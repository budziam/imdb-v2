import { Request, Response } from "express";

export abstract class Validator {
    public abstract validate(req: Request, res: Response): Promise<void>;
}
