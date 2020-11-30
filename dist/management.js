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
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var databaseImportTask;
var databaseConfig = "database/config.js";
if (fs_1.default.existsSync(databaseConfig)) {
    var databaseConfigPath = path_1.default.resolve(databaseConfig);
    console.log("Importing " + databaseConfigPath + "...");
    databaseImportTask = Promise.resolve().then(function () { return __importStar(require(databaseConfigPath)); });
}
else {
    console.log("No configuration found at " + databaseConfig);
    databaseImportTask = Promise.resolve({});
}
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
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function () {
        function getDocumentOperation(collection, payload, context, permission, user) {
            return __awaiter(this, void 0, void 0, function () {
                var additionalQuery, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            additionalQuery = permission.restrictDocsByUser ? { _userId: user.userId } : {};
                            return [4 /*yield*/, collection.getDocument(payload._id, additionalQuery)];
                        case 1:
                            result = _a.sent();
                            setResponse(context, 200, { result: result });
                            return [2 /*return*/];
                    }
                });
            });
        }
        function findDocumentsOperation(collection, payload, context, permission, user) {
            var _a, _b, _c, _d, _e;
            return __awaiter(this, void 0, void 0, function () {
                var options, query, result;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            options = {
                                sort: (_a = payload.options) === null || _a === void 0 ? void 0 : _a.sort,
                                skip: (_b = payload.options) === null || _b === void 0 ? void 0 : _b.skip,
                                limit: (_c = payload.options) === null || _c === void 0 ? void 0 : _c.limit,
                                projection: (_d = payload.options) === null || _d === void 0 ? void 0 : _d.projection
                            };
                            query = (_e = payload.query) !== null && _e !== void 0 ? _e : {};
                            if (permission.restrictDocsByUser) {
                                query._userId = user.userId;
                            }
                            return [4 /*yield*/, collection.findDocuments(query, options)];
                        case 1:
                            result = _f.sent();
                            setResponse(context, 200, { result: result });
                            return [2 /*return*/];
                    }
                });
            });
        }
        function insertDocumentOperation(collection, payload, context, permission, user) {
            return __awaiter(this, void 0, void 0, function () {
                var newId, data, updatePayload;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, collection.insertDocument(payload.doc)];
                        case 1:
                            newId = _a.sent();
                            setResponse(context, 200, { result: newId });
                            if (!permission.restrictDocsByUser) return [3 /*break*/, 3];
                            data = Object.assign({}, payload.doc, { _id: newId });
                            updatePayload = {
                                data: data,
                                operation: 'insertDocument',
                                collection: payload.collection
                            };
                            return [4 /*yield*/, signalRClient.send('_swa_database_update', updatePayload, { userId: user === null || user === void 0 ? void 0 : user.userId })];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
        function replaceDocumentOperation(collection, payload, context, permission, user) {
            return __awaiter(this, void 0, void 0, function () {
                var additionalQuery, updatePayload;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            additionalQuery = permission.restrictDocsByUser ? { _userId: user.userId } : {};
                            return [4 /*yield*/, collection.replaceDocument(payload.doc, additionalQuery)];
                        case 1:
                            _a.sent();
                            setResponse(context, 200);
                            if (!permission.restrictDocsByUser) return [3 /*break*/, 3];
                            updatePayload = {
                                data: payload.doc,
                                operation: 'replaceDocument',
                                collection: payload.collection
                            };
                            return [4 /*yield*/, signalRClient.send('_swa_database_update', updatePayload, { userId: user === null || user === void 0 ? void 0 : user.userId })];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
        function deleteDocumentOperation(collection, payload, context, permission, user) {
            return __awaiter(this, void 0, void 0, function () {
                var additionalQuery, updatePayload;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            additionalQuery = permission.restrictDocsByUser ? { _userId: user.userId } : {};
                            return [4 /*yield*/, collection.deleteDocument(payload._id, additionalQuery)];
                        case 1:
                            _a.sent();
                            setResponse(context, 200);
                            if (!permission.restrictDocsByUser) return [3 /*break*/, 3];
                            updatePayload = {
                                data: { _id: payload._id },
                                operation: 'deleteDocument',
                                collection: payload.collection
                            };
                            return [4 /*yield*/, signalRClient.send('_swa_database_update', updatePayload, { userId: user === null || user === void 0 ? void 0 : user.userId })];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [2 /*return*/];
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
        var payload, config, collectionConfig, operationPermission, matchingAllowedUserRoles, database, collection, signalRClient, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
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
                    return [4 /*yield*/, databaseImportTask];
                case 1:
                    config = _g.sent();
                    if (!payload.collection || !((_d = (_c = config.collections) === null || _c === void 0 ? void 0 : _c[payload.collection]) === null || _d === void 0 ? void 0 : _d.permissions)) {
                        throw new Error("No configuration defined for " + payload.collection);
                    }
                    collectionConfig = config.collections[payload.collection];
                    operationPermission = (_e = collectionConfig.permissions) === null || _e === void 0 ? void 0 : _e.find(function (p) { var _a; return (_a = p.operations) === null || _a === void 0 ? void 0 : _a.find(function (o) { return o === payload.operation; }); });
                    if (!operationPermission) {
                        throw new Error("No permissions defined for " + payload.collection + " " + payload.operation);
                    }
                    matchingAllowedUserRoles = user.userRoles.filter(function (value) { var _a; return (_a = operationPermission === null || operationPermission === void 0 ? void 0 : operationPermission.allowedRoles) === null || _a === void 0 ? void 0 : _a.includes(value); });
                    if (matchingAllowedUserRoles.length === 0) {
                        if (context.res) {
                            context.res.status = 403;
                        }
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, mongodb_1.MongoDb.getClient(user)];
                case 2:
                    database = _g.sent();
                    collection = database === null || database === void 0 ? void 0 : database.collection(payload.collection);
                    if (!database || !collection || !payload.collection) {
                        setResponse(context, 400);
                        return [2 /*return*/];
                    }
                    signalRClient = signalr_1.SignalRClient.fromConnectionString();
                    _f = payload.operation;
                    switch (_f) {
                        case "getDocument": return [3 /*break*/, 3];
                        case "findDocuments": return [3 /*break*/, 5];
                        case "insertDocument": return [3 /*break*/, 7];
                        case "replaceDocument": return [3 /*break*/, 9];
                        case "deleteDocument": return [3 /*break*/, 11];
                    }
                    return [3 /*break*/, 13];
                case 3: return [4 /*yield*/, getDocumentOperation(collection, payload, context, operationPermission, user)];
                case 4:
                    _g.sent();
                    return [2 /*return*/];
                case 5: return [4 /*yield*/, findDocumentsOperation(collection, payload, context, operationPermission, user)];
                case 6:
                    _g.sent();
                    return [2 /*return*/];
                case 7: return [4 /*yield*/, insertDocumentOperation(collection, payload, context, operationPermission, user)];
                case 8:
                    _g.sent();
                    return [2 /*return*/];
                case 9: return [4 /*yield*/, replaceDocumentOperation(collection, payload, context, operationPermission, user)];
                case 10:
                    _g.sent();
                    return [2 /*return*/];
                case 11: return [4 /*yield*/, deleteDocumentOperation(collection, payload, context, operationPermission, user)];
                case 12:
                    _g.sent();
                    return [2 /*return*/];
                case 13: return [2 /*return*/];
            }
        });
    });
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
