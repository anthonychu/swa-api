"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaManagementFunctionJson = exports.swaManagementFunction = void 0;
var auth_1 = require("./auth");
var constants_1 = __importDefault(require("./constants"));
var signalr_1 = require("./signalr");
function swaManagementFunction(context) {
    return __awaiter(this, void 0, void 0, function () {
        var route, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    route = context.bindingData.route;
                    context.log("Management function triggered: " + route);
                    _a = route;
                    switch (_a) {
                        case "realtime/negotiate": return [3 /*break*/, 1];
                    }
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, signalRNegotiate(context)];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.swaManagementFunction = swaManagementFunction;
function signalRNegotiate(context) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var user, client, _i, _b, role;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    user = auth_1.decodeAuthInfo(context.req);
                    client = signalr_1.SignalRClient.fromConnectionString();
                    if (!user) return [3 /*break*/, 7];
                    return [4 /*yield*/, client.removeUserFromAllGroups(user.userId)];
                case 1:
                    _c.sent();
                    _i = 0, _b = user.userRoles;
                    _c.label = 2;
                case 2:
                    if (!(_i < _b.length)) return [3 /*break*/, 5];
                    role = _b[_i];
                    if (!(role !== constants_1.default.anonymousUserRoleName)) return [3 /*break*/, 4];
                    return [4 /*yield*/, client.addUserToGroup(user.userId, role)];
                case 3:
                    _c.sent();
                    _c.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [4 /*yield*/, client.addUserToGroup(user.userId, getUserDetailGroupName(user.userDetails))];
                case 6:
                    _c.sent();
                    _c.label = 7;
                case 7:
                    (_a = context.res) === null || _a === void 0 ? void 0 : _a.json(client.generateNegotiatePayload(user === null || user === void 0 ? void 0 : user.userId));
                    return [2 /*return*/];
            }
        });
    });
}
function getUserDetailGroupName(userDetails) {
    return "userdetail_" + userDetails.replace(/[^A-Za-z0-9]/g, "_");
}
var swaManagementFunctionJson = {
    "disabled": false,
    "bindings": [
        {
            "authLevel": "anonymous",
            "type": "httpTrigger",
            "direction": "in",
            "name": "req",
            "route": "management/{*route}"
        },
        {
            "type": "http",
            "direction": "out",
            "name": "res"
        }
    ]
};
exports.swaManagementFunctionJson = swaManagementFunctionJson;
