import { Request, Response } from "express";
import { injectable } from "inversify";
import { Validator } from "../../Abstracts/Validator";

@injectable()
export class GetMoviesCollectionValidator extends Validator {
    public async validate(req: Request, res: Response): Promise<void> {
        //
    }
}
