import { Container } from "inversify";
import "reflect-metadata";

export const createContainer = (): Container => {
    const container = new Container({autoBindInjectable: true});
    container.bind(Container).toConstantValue(container);

    return container;
};
