"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignalRClient = void 0;
var jwt = __importStar(require("jsonwebtoken"));
var SignalRClient = /** @class */ (function () {
    function SignalRClient(endpoint, accessKey, hubName) {
        this.endpoint = endpoint;
        this.accessKey = accessKey;
        this.hubName = hubName;
    }
    SignalRClient.fromConnectionString = function (connectionString) {
        connectionString = connectionString !== null && connectionString !== void 0 ? connectionString : process.env.SWA_SIGNALR_CONNECTION_STRING;
        if (!connectionString) {
            throw "No SignalR Service connection string found.";
        }
        var endpointMatch = /\bEndpoint=([^;]+)/i.exec(connectionString);
        var endpoint = endpointMatch === null || endpointMatch === void 0 ? void 0 : endpointMatch[1];
        var accessKeyMatch = /\bAccessKey=([^;]+)/i.exec(connectionString);
        var accessKey = accessKeyMatch === null || accessKeyMatch === void 0 ? void 0 : accessKeyMatch[1];
        if (!(endpoint && accessKey)) {
            throw "Could not parse SignalR Service connection string.";
        }
        return new SignalRClient(endpoint, accessKey, this.defaultHubName);
    };
    SignalRClient.prototype.generateNegotiatePayload = function (userId) {
        var hubUrl = this.endpoint + "/client/?hub=" + this.hubName;
        var payload = {
            aud: hubUrl,
            iat: Math.floor(Date.now() / 1000) - 30,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
        };
        if (userId) {
            payload.nameid = userId;
        }
        var accessToken = jwt.sign(payload, this.accessKey);
        return {
            accessToken: accessToken,
            url: hubUrl
        };
    };
    SignalRClient.defaultHubName = "default";
    return SignalRClient;
}());
exports.SignalRClient = SignalRClient;
