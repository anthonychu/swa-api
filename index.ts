import { HttpFunctionBuilder } from "./httpfunctionbuilder";
import { Realtime } from "./realtime";
import { RpcFunctionBuilder } from "./rpcfunctionbuilder";

const http = new HttpFunctionBuilder();
const rpc = new RpcFunctionBuilder();
const util = {
    generateNegotiateFunction: Realtime.generateNegotiateFunction
};

export {
    http,
    rpc,
    util
};