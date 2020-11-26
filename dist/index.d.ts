import { HttpFunctionBuilder } from "./httpfunctionbuilder";
import { Realtime } from "./realtime";
import { RpcFunctionBuilder } from "./rpcfunctionbuilder";
declare const http: HttpFunctionBuilder;
declare const rpc: RpcFunctionBuilder;
declare const util: {
    generateNegotiateFunction: typeof Realtime.generateNegotiateFunction;
};
export { http, rpc, util };
//# sourceMappingURL=index.d.ts.map