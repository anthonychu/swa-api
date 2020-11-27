import { Realtime } from "./realtime";
import { Logger } from "./serverlessfunctions";
import { Db } from "mongodb";
import { AuthenticatedUser } from "./functionbuilder";
import { Context } from "@azure/functions";
import { MongoDb } from "./mongodb";

export class BaseHttpContext {
    log: Logger;
    db?: Db;
    realtime?: Realtime;
    user?: AuthenticatedUser;

    constructor(context: Context) {
        this.log = context.log;
    }

    async initializeServices(): Promise<void> {
        this.realtime = new Realtime();
        this.db = await MongoDb.getClient();
    }
}