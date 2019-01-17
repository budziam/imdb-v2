import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { Container } from "inversify";
import * as sinonChai from "sinon-chai";
import * as winston from "winston";
import { createContainer } from "../src/inversify.config";

export const setup = (): Container => {
    chai.use(chaiAsPromised);
    chai.use(sinonChai);
    // @ts-ignore
    winston.level = "nope";

    return createContainer();
};
