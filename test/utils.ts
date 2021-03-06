import { createContainer } from "../src/inversify.config";
import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { Express, Request, Response } from "express";
import { Container } from "inversify";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import { Connection } from "typeorm";
import * as winston from "winston";
import { Config, ConfigKey } from "../src/Config";
import { createORMConnection } from "../src/typeorm.config";

export const setup = (): Container => {
    chai.use(chaiAsPromised);
    chai.use(sinonChai);
    // @ts-ignore
    winston.level = "error";

    return createContainer();
};

export const setupWithDb = async (): Promise<Container> => {
    const container = setup();
    const config = container.get<Config>(Config);

    const connection = await createORMConnection(config);
    container.bind(Connection).toConstantValue(connection);

    return container;
};

export const tearDownWithDb = async (container: Container): Promise<void> => {
    const connection = container.get<Connection>(Connection);
    await connection.dropDatabase();
    await connection.close();
};

export const makeRequest = async (app: Express, req: Request, res: Response) =>
    new Promise((resolve) => app(req, res, resolve));

export const sleep = async (timeout?: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, timeout));

export const mockAxios = (): any => ({
    get: sinon.stub(),
});
