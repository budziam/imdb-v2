import { createContainer } from "./src/inversify.config";
import { AppServer } from "./src/AppServer";

const container = createContainer();
const server = container.get<AppServer>(AppServer);

server.start();
