import * as Ajv from "ajv";
import { ValidationError } from "ajv";
import { Request, Response } from "express";

export abstract class Validator {
    public abstract validate(req: Request, res: Response): Promise<void>;

    protected validateSchema(schema: any, data: any): void {
        const ajv = new Ajv();

        const isValid = ajv.validate(schema, data);

        if (!isValid) {
            throw new ValidationError(ajv.errors);
        }
    }
}
