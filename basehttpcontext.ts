import { Realtime } from "./realtime";
import { Logger } from "./serverlessfunctions";
import { AuthenticatedUser } from "./functionbuilder";
import { Context } from "@azure/functions";
import { MongoDb } from "./mongodb";
import { Database } from "./database";

export class BaseHttpContext {
    log: Logger;
    database?: Database;
    realtime?: Realtime;
    user?: AuthenticatedUser;

    constructor(context: Context) {
        this.log = context.log;
    }

    async initializeServices(user: AuthenticatedUser | null): Promise<void> {
        this.user = user ?? undefined;
        this.realtime = new Realtime();
        this.database = await MongoDb.getClient(this.user);
    }
}