"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.HttpFunctionBuilder = void 0;
var functionbuilder_1 = require("./functionbuilder");
var httpcontext_1 = require("./httpcontext");
var busboy_1 = __importDefault(require("busboy"));
var HttpFunctionBuilder = /** @class */ (function (_super) {
    __extends(HttpFunctionBuilder, _super);
    function HttpFunctionBuilder(context) {
        var _this = this;
        var factory = function (ctx) { return new HttpFunctionBuilder(ctx); };
        _this = _super.call(this, factory, functionbuilder_1.FunctionBuilderContext, context) || this;
        return _this;
    }
    HttpFunctionBuilder.prototype.allow = function (options) {
        return _super.prototype.allow.call(this, options);
    };
    HttpFunctionBuilder.prototype.allowAuthenticated = function () {
        return _super.prototype.allowAuthenticated.call(this);
    };
    HttpFunctionBuilder.prototype.onRequest = function (func) {
        var _this = this;
        return function (funcContext) { return __awaiter(_this, void 0, void 0, function () {
            var httpContext, req, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        httpContext = new httpcontext_1.HttpContext(funcContext);
                        return [4 /*yield*/, httpContext.initializeServices()];
                    case 1:
                        _b.sent();
                        httpContext.user = this.decodeAuthInfo(funcContext.req);
                        if (!this.isAuthorized(httpContext.user)) {
                            funcContext.res = { status: httpContext.user ? 403 : 401 };
                            return [2 /*return*/];
                        }
                        req = funcContext.req;
                        if (!(req && req.headers['content-type'] && req.headers['content-type'].startsWith('multipart/form-data'))) return [3 /*break*/, 3];
                        _a = req;
                        return [4 /*yield*/, this.parseMultipartData(req)];
                    case 2:
                        _a.form = _b.sent();
                        _b.label = 3;
                    case 3: return [4 /*yield*/, Promise.resolve(func(httpContext))];
                    case 4:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); };
    };
    HttpFunctionBuilder.prototype.parseMultipartData = function (req) {
        return new Promise(function (resolve, reject) {
            var busboy = new busboy_1.default({ headers: req.headers });
            var form = {};
            busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
                var fieldData = [];
                var formFile = {
                    filename: filename,
                    encoding: encoding,
                    mimetype: mimetype
                };
                file.on('data', function (data) {
                    fieldData.push.apply(fieldData, data);
                });
                file.on('end', function () {
                    formFile.data = Buffer.from(fieldData);
                    form[fieldname] = formFile;
                });
            });
            busboy.on('field', function (fieldname, val) {
                form[fieldname] = val;
            });
            busboy.on('finish', function () {
                resolve(form);
            });
            busboy.on('error', reject);
            busboy.write(req.body);
        });
    };
    return HttpFunctionBuilder;
}(functionbuilder_1.FunctionBuilder));
exports.HttpFunctionBuilder = HttpFunctionBuilder;
