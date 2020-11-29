import { AuthorizationOptions } from "./auth";
import { FunctionBuilder, FunctionBuilderContext } from "./functionbuilder";
import { RpcContext } from "./rpccontext";
import { ServerlessFunction } from "./serverlessfunctions";
export declare class RpcFunctionBuilder extends FunctionBuilder<FunctionBuilderContext> {
    constructor(context?: FunctionBuilderContext);
    allow(options: AuthorizationOptions): RpcFunctionBuilder;
    allowAuthenticated(): RpcFunctionBuilder;
    onInvoke(func: (context: RpcContext) => void | Promise<void>): ServerlessFunction;
}
//# sourceMappingURL=rpcfunctionbuilder.d.ts.map