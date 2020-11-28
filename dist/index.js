"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rpc = exports.http = void 0;
var httpfunctionbuilder_1 = require("./httpfunctionbuilder");
var rpcfunctionbuilder_1 = require("./rpcfunctionbuilder");
var http = new httpfunctionbuilder_1.HttpFunctionBuilder();
exports.http = http;
var rpc = new rpcfunctionbuilder_1.RpcFunctionBuilder();
exports.rpc = rpc;
