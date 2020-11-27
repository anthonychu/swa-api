import { Context } from "@azure/functions";
import { BaseHttpContext } from "./basehttpcontext";

export class RpcContext extends BaseHttpContext {
    constructor(context: Context, public input?: unknown) {
        super(context);
    }
}