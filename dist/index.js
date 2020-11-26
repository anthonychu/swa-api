"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.util = exports.rpc = exports.http = void 0;
var httpfunctionbuilder_1 = require("./httpfunctionbuilder");
var realtime_1 = require("./realtime");
var rpcfunctionbuilder_1 = require("./rpcfunctionbuilder");
var http = new httpfunctionbuilder_1.HttpFunctionBuilder();
exports.http = http;
var rpc = new rpcfunctionbuilder_1.RpcFunctionBuilder();
exports.rpc = rpc;
var util = {
    generateNegotiateFunction: realtime_1.Realtime.generateNegotiateFunction
};
exports.util = util;
