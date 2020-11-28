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
var promises_1 = __importDefault(require("fs/promises"));
var path_1 = __importDefault(require("path"));
var fs_1 = require("fs");
var management_1 = require("../management");
var constants_1 = __importDefault(require("../constants"));
function generate() {
    return __awaiter(this, void 0, void 0, function () {
        var hostJsonFile;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (fs_1.existsSync(constants_1.default.managementFunctionName)) {
                        throw constants_1.default.managementFunctionName + " already exists. Unable to generate Azure Functions artifacts";
                    }
                    return [4 /*yield*/, promises_1.default.mkdir(constants_1.default.managementFunctionName)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, promises_1.default.writeFile(path_1.default.join(constants_1.default.managementFunctionName, "function.json"), JSON.stringify(management_1.swaManagementFunctionJson))];
                case 2:
                    _a.sent();
                    console.log("+ " + path_1.default.join(constants_1.default.managementFunctionName, "function.json"));
                    return [4 /*yield*/, promises_1.default.writeFile(path_1.default.join(constants_1.default.managementFunctionName, "index.js"), "module.exports = require(\"swa-api/dist/management\").swaManagementFunction;")];
                case 3:
                    _a.sent();
                    console.log("+ " + path_1.default.join(constants_1.default.managementFunctionName, "index.js"));
                    return [4 /*yield*/, generateFunctionFolders("http")];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, generateFunctionFolders("rpc")];
                case 5:
                    _a.sent();
                    hostJsonFile = 'host.json';
                    return [4 /*yield*/, promises_1.default.writeFile(hostJsonFile, JSON.stringify({
                            "version": "2.0",
                            "logging": {
                                "applicationInsights": {
                                    "samplingExcludedTypes": "Request",
                                    "samplingSettings": {
                                        "isEnabled": true
                                    }
                                }
                            }
                        }, null, 2))];
                case 6:
                    _a.sent();
                    console.log("+ " + hostJsonFile);
                    return [2 /*return*/];
            }
        });
    });
}
function generateFunctionFolders(folder) {
    return __awaiter(this, void 0, void 0, function () {
        var files, _i, _a, file, fileStats, functionName, functionFolderName, functionJson, methodMatch, method;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, promises_1.default.readdir(folder)];
                case 1:
                    files = _b.sent();
                    _i = 0, _a = files.filter(function (f) { return f.endsWith('.js'); });
                    _b.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 7];
                    file = _a[_i];
                    return [4 /*yield*/, promises_1.default.lstat(path_1.default.join(folder, file))];
                case 3:
                    fileStats = _b.sent();
                    if (!fileStats.isFile()) return [3 /*break*/, 6];
                    functionName = path_1.default.parse(file).name.replace(/[^A-Za-z0-9]/g, " ").trim().replace(" ", "_");
                    functionFolderName = folder + "_" + functionName;
                    return [4 /*yield*/, promises_1.default.mkdir(functionFolderName)];
                case 4:
                    _b.sent();
                    functionJson = {
                        "generatedBy": "swa-api",
                        "scriptFile": path_1.default.join('..', folder, file),
                        "disabled": false,
                        "bindings": [
                            {
                                "authLevel": "anonymous",
                                "type": "httpTrigger",
                                "direction": "in",
                                "name": "req"
                            },
                            {
                                "type": "http",
                                "direction": "out",
                                "name": "res"
                            }
                        ]
                    };
                    if (folder === "http") {
                        methodMatch = /_(get|post|delete|put|patch|head|connect|options|trace)$/i.exec(functionName);
                        method = methodMatch === null || methodMatch === void 0 ? void 0 : methodMatch[1].toLowerCase();
                        if (method) {
                            functionJson.bindings[0].methods = [method];
                            functionJson.bindings[0].route = functionName.replace(new RegExp("_" + method + "$"), "");
                        }
                        else {
                            functionJson.bindings[0].route = functionName;
                        }
                    }
                    else {
                        functionJson.bindings[0].methods = ["post"];
                        functionJson.bindings[0].route = "rpc/" + functionName;
                    }
                    return [4 /*yield*/, promises_1.default.writeFile(path_1.default.join(functionFolderName, 'function.json'), JSON.stringify(functionJson, null, 2))];
                case 5:
                    _b.sent();
                    console.log("+ " + path_1.default.join(functionFolderName, 'function.json'));
                    _b.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 2];
                case 7: return [2 /*return*/];
            }
        });
    });
}
generate();
