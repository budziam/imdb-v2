import "reflect-metadata";
import { Connection } from "typeorm";
import { AppServer } from "./src/AppServer";
import { Config } from "./src/Config";
import { ErrorHandler } from "./src/ErrorHandler";
import { createContainer } from "./src/inversify.config";
import { createORMConnection } from "./src/typeorm.config";

const container = createContainer();
const config = container.get<Config>(Config);
const errorHandler = container.get<ErrorHandler>(ErrorHandler);

createORMConnection(config)
    .then((connection) => container.bind(Connection).toConstantValue(connection))
    .then(() => container.get<AppServer>(AppServer).start())
    .catch(errorHandler.handle);
