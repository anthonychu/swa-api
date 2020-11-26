import { HttpFunctionBuilder } from "./httpfunctionbuilder";
import { RpcFunctionBuilder } from "./rpcfunctionbuilder";

const http = new HttpFunctionBuilder();
const rpc = new RpcFunctionBuilder();

export {
    http,
    rpc
};