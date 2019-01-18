import "reflect-metadata";
import axios from "axios";
import { Container } from "inversify";
// @ts-ignore
import * as env from "node-env-file";
import { AllRoutes } from "./AllRoutes";
import { AppServer } from "./AppServer";
import { Config, ConfigKey } from "./Config";
import { ErrorHandler } from "./ErrorHandler";
import { OmdbRequester } from "./OmdbRequester";

export const createContainer = (): Container => {
    env(`${__dirname}/../.env`);

    const container = new Container({
        autoBindInjectable: true,
        skipBaseClassChecks: true,
    });

    container.bind(Container).toConstantValue(container);

    container.bind(Config)
        .toDynamicValue(() => new Config([
            [ConfigKey.PORT, process.env.APP_PORT || "3001"],
            [ConfigKey.DB_HOST, process.env.DB_HOST || "postgres"],
            [ConfigKey.DB_PORT, process.env.DB_PORT || "5432"],
            [ConfigKey.DB_USERNAME, process.env.DB_USERNAME || "postgres"],
            [ConfigKey.DB_PASSWORD, process.env.DB_PASSWORD || ""],
            [ConfigKey.DB_DATABASE, process.env.DB_DATABASE || "app"],
        ]))
        .inSingletonScope();

    container.bind(AppServer)
        .toDynamicValue(() => {
            const config = container.get<Config>(Config);

            return new AppServer(
                container.get<ErrorHandler>(ErrorHandler),
                container.get<AllRoutes>(AllRoutes),
                parseInt(config.get(ConfigKey.PORT)),
            );
        })
        .inSingletonScope();

    container.bind(OmdbRequester)
        .toDynamicValue(() => {
            const config = container.get<Config>(Config);

            return new OmdbRequester(axios, config.get(ConfigKey.OMDB_API_KEY));
        });

    return container;
};
