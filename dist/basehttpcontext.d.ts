import { Realtime } from "./realtime";
import { Logger } from "./serverlessfunctions";
import { AuthenticatedUser } from "./functionbuilder";
import { Context } from "@azure/functions";
import { Database } from "./database";
export declare class BaseHttpContext {
    log: Logger;
    database?: Database;
    realtime?: Realtime;
    user?: AuthenticatedUser;
    constructor(context: Context);
    initializeServices(user: AuthenticatedUser | null): Promise<void>;
}
//# sourceMappingURL=basehttpcontext.d.ts.map