import { injectable } from "inversify";

export enum ConfigKey {
    PORT = "APP_PORT",
}

@injectable()
export class Config extends Map<ConfigKey, string> {
    //
}
