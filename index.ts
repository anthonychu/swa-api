import { DatabaseConfigHelper } from "./database";
import { HttpFunctionBuilder } from "./httpfunctionbuilder";
import { RpcFunctionBuilder } from "./rpcfunctionbuilder";

const http = new HttpFunctionBuilder();
const rpc = new RpcFunctionBuilder();
const database = new DatabaseConfigHelper();

export {
    http,
    rpc,
    database
};