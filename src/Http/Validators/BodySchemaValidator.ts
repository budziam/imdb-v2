import { Request, Response } from "express";
import { injectable } from "inversify";
import { Validator } from "../../Abstracts/Validator";

@injectable()
export class BodySchemaValidator extends Validator {
    public constructor(private readonly schema: any) {
        super();
    }

    public async validate(req: Request, res: Response): Promise<void> {
        this.validateSchema(this.schema, req.body);
    }
}
