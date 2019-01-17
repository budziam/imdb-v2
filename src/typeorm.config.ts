import { Connection, createConnection, getConnectionOptions } from "typeorm";
import { Config, ConfigKey } from "./Config";

export const createORMConnection = async (config: Config): Promise<Connection> => {
    const connectionOptions = await getConnectionOptions();

    return createConnection({
        ...connectionOptions,
        type: "postgres",
        host: config.get(ConfigKey.DB_HOST),
        port: parseInt(config.get(ConfigKey.DB_PORT)),
        username: config.get(ConfigKey.DB_USERNAME),
        password: config.get(ConfigKey.DB_PASSWORD),
        database: config.get(ConfigKey.DB_DATABASE),
    });
};
