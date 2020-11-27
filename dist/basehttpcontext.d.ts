import { Realtime } from "./realtime";
import { Logger } from "./serverlessfunctions";
import { Db } from "mongodb";
import { AuthenticatedUser } from "./functionbuilder";
import { Context } from "@azure/functions";
export declare class BaseHttpContext {
    log: Logger;
    db?: Db;
    realtime?: Realtime;
    user?: AuthenticatedUser;
    constructor(context: Context);
    initializeServices(): Promise<void>;
}
//# sourceMappingURL=basehttpcontext.d.ts.map