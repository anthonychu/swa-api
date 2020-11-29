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
var mongodb_1 = require("./mongodb");
var signalr_1 = require("./signalr");
function swaManagementFunction(context) {
    return __awaiter(this, void 0, void 0, function () {
        var route, user, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    route = context.bindingData.route;
                    user = auth_1.decodeAuthInfo(context.req);
                    context.log("Management function triggered: " + route);
                    _a = route;
                    switch (_a) {
                        case "realtime/negotiate": return [3 /*break*/, 1];
                        case "database/operation": return [3 /*break*/, 3];
                    }
                    return [3 /*break*/, 5];
                case 1: return [4 /*yield*/, signalRNegotiate(context, user)];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
                case 3: return [4 /*yield*/, processDatabaseOperation(context, user)];
                case 4:
                    _b.sent();
                    return [2 /*return*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.swaManagementFunction = swaManagementFunction;
function processDatabaseOperation(context, user) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var payload, database, collection, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (((_a = context.req) === null || _a === void 0 ? void 0 : _a.method) !== "POST") {
                        if (context.res) {
                            context.res.status = 400;
                        }
                        return [2 /*return*/];
                    }
                    if (!user) {
                        if (context.res) {
                            context.res.status = 401;
                        }
                        return [2 /*return*/];
                    }
                    payload = (_b = context.req) === null || _b === void 0 ? void 0 : _b.body;
                    return [4 /*yield*/, mongodb_1.MongoDb.getClient(user)];
                case 1:
                    database = _d.sent();
                    collection = database === null || database === void 0 ? void 0 : database.collection(payload.collection);
                    if (!database || !collection || !payload.collection) {
                        setResponse(context, 400);
                        return [2 /*return*/];
                    }
                    _c = payload.operation;
                    switch (_c) {
                        case "getDocument": return [3 /*break*/, 2];
                        case "findDocuments": return [3 /*break*/, 4];
                        case "insertDocument": return [3 /*break*/, 6];
                        case "replaceDocument": return [3 /*break*/, 8];
                        case "deleteDocument": return [3 /*break*/, 10];
                    }
                    return [3 /*break*/, 12];
                case 2: return [4 /*yield*/, getDocumentOperation(collection, payload, context)];
                case 3:
                    _d.sent();
                    return [2 /*return*/];
                case 4: return [4 /*yield*/, findDocumentsOperation(collection, payload, context)];
                case 5:
                    _d.sent();
                    return [2 /*return*/];
                case 6: return [4 /*yield*/, insertDocumentOperation(collection, payload, context)];
                case 7:
                    _d.sent();
                    return [2 /*return*/];
                case 8: return [4 /*yield*/, replaceDocumentOperation(collection, payload, context)];
                case 9:
                    _d.sent();
                    return [2 /*return*/];
                case 10: return [4 /*yield*/, deleteDocumentOperation(collection, payload, context)];
                case 11:
                    _d.sent();
                    return [2 /*return*/];
                case 12: return [2 /*return*/];
            }
        });
    });
}
function getDocumentOperation(collection, payload, context) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, collection.getDocument(payload._id)];
                case 1:
                    result = _a.sent();
                    setResponse(context, 200, { result: result });
                    return [2 /*return*/];
            }
        });
    });
}
function findDocumentsOperation(collection, payload, context) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, collection.findDocuments(payload.query, payload.options)];
                case 1:
                    result = _a.sent();
                    setResponse(context, 200, { result: result });
                    return [2 /*return*/];
            }
        });
    });
}
function insertDocumentOperation(collection, payload, context) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, collection.insertDocument(payload.doc)];
                case 1:
                    result = _a.sent();
                    setResponse(context, 200, { result: result });
                    return [2 /*return*/];
            }
        });
    });
}
function replaceDocumentOperation(collection, payload, context) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, collection.replaceDocument(payload.doc)];
                case 1:
                    _a.sent();
                    setResponse(context, 200);
                    return [2 /*return*/];
            }
        });
    });
}
function deleteDocumentOperation(collection, payload, context) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, collection.deleteDocument(payload._id)];
                case 1:
                    _a.sent();
                    setResponse(context, 200);
                    return [2 /*return*/];
            }
        });
    });
}
function setResponse(context, status, body) {
    if (context.res) {
        context.res.status = status;
        context.res.headers = {
            "Content-Type": "application/json"
        };
        if (body) {
            context.res.body = body;
        }
    }
}
function signalRNegotiate(context, user) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var client, _i, _b, role;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
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
