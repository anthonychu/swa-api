import { Realtime } from "./realtime";
import { Logger } from "./serverlessfunctions";
import { Db } from "mongodb";
import { AuthenticatedUser } from "./functionbuilder";
export declare class BaseHttpContext {
    log?: Logger;
    db?: Db;
    realtime: Realtime;
    user?: AuthenticatedUser;
}
//# sourceMappingURL=basehttpcontext.d.ts.map