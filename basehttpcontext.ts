import { Realtime } from "./realtime";
import { Logger } from "./serverlessfunctions";
import { Db } from "mongodb";
import { AuthenticatedUser } from "./functionbuilder";

export class BaseHttpContext {
    log?: Logger;
    db?: Db;
    realtime = new Realtime();
    user?: AuthenticatedUser;
}