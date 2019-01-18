import { injectable } from "inversify";

export enum ConfigKey {
    PORT = "APP_PORT",
    DB_HOST = "DB_HOST",
    DB_PORT = "DB_PORT",
    DB_USERNAME = "DB_USERNAME",
    DB_PASSWORD = "DB_PASSWORD",
    DB_DATABASE = "DB_DATABASE",
    OMDB_API_KEY = "OMDB_API_KEY",
}

@injectable()
export class Config extends Map<ConfigKey, string> {
    //
}
