import "reflect-metadata";
// tslint:disable-next-line:ordered-imports
import { Container } from "inversify";
import { AllRoutes } from "./AllRoutes";
import { AppServer } from "./AppServer";
import { Config, ConfigKey } from "./Config";
import { ErrorHandler } from "./ErrorHandler";

export const createContainer = (): Container => {
    const container = new Container({
        autoBindInjectable: true,
    });

    container.bind(Container).toConstantValue(container);

    container.bind(Config)
        .toDynamicValue(() => new Config([
            [ConfigKey.PORT, process.env.APP_PORT || "3001"],
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

    return container;
};
