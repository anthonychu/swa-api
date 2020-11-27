import { Context } from "@azure/functions";
import { BaseHttpContext } from "./basehttpcontext";
export declare class RpcContext extends BaseHttpContext {
    input?: unknown;
    constructor(context: Context, input?: unknown);
}
//# sourceMappingURL=rpccontext.d.ts.map