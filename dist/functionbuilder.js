"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionBuilderContext = exports.FunctionBuilder = void 0;
var FunctionBuilder = /** @class */ (function () {
    function FunctionBuilder(builderFactory, contextType, context) {
        this.builderFactory = builderFactory;
        this.contextType = contextType;
        this.context = new contextType();
        if (context) {
            Object.assign(this.context, context);
        }
    }
    FunctionBuilder.prototype.allow = function (options) {
        if (this.context.authorizationOptions) {
            throw "Cannot call allow() or allowAuthenticated() more than once.";
        }
        this.context.authorizationOptions = options;
        return this.builderFactory(this.context);
    };
    FunctionBuilder.prototype.allowAuthenticated = function () {
        return this.allow({ userRoles: ["authenticated"] });
    };
    FunctionBuilder.prototype.decodeAuthInfo = function (req) {
        if (!req)
            return;
        // This block sets a development user that has rights to upload
        // TODO: find a better way to do this
        if (process.env.AZURE_FUNCTIONS_ENVIRONMENT === "Development") {
            return {
                identityProvider: "github",
                userId: "17baeed9bn1sa3e5dbs24283",
                userDetails: "testuser",
                userRoles: ["admin", "anonymous", "authenticated"],
            };
        }
        var clientPrincipalHeader = "x-ms-client-principal";
        if (req.headers[clientPrincipalHeader] == null) {
            return;
        }
        var buffer = Buffer.from(req.headers[clientPrincipalHeader], "base64");
        var serializedJson = buffer.toString("ascii");
        return JSON.parse(serializedJson);
    };
    FunctionBuilder.prototype.isAuthorized = function (authenticatedUser) {
        var _this = this;
        var _a, _b, _c;
        var allowAnonymous = this.context.authorizationOptions;
        if (!allowAnonymous)
            return true;
        if (!authenticatedUser)
            return false;
        if ((_a = this.context.authorizationOptions) === null || _a === void 0 ? void 0 : _a.userRoles) {
            var matchingRoles = authenticatedUser.userRoles.filter(function (value) { var _a, _b; return (_b = (_a = _this.context.authorizationOptions) === null || _a === void 0 ? void 0 : _a.userRoles) === null || _b === void 0 ? void 0 : _b.includes(value); });
            if (matchingRoles.length > 0) {
                return true;
            }
        }
        if ((_b = this.context.authorizationOptions) === null || _b === void 0 ? void 0 : _b.userDetails) {
            if (this.context.authorizationOptions.userDetails.includes(authenticatedUser.userDetails)) {
                return true;
            }
        }
        if ((_c = this.context.authorizationOptions) === null || _c === void 0 ? void 0 : _c.userIds) {
            if (this.context.authorizationOptions.userIds.includes(authenticatedUser.userId)) {
                return true;
            }
        }
        return false;
    };
    return FunctionBuilder;
}());
exports.FunctionBuilder = FunctionBuilder;
var FunctionBuilderContext = /** @class */ (function () {
    function FunctionBuilderContext() {
    }
    return FunctionBuilderContext;
}());
exports.FunctionBuilderContext = FunctionBuilderContext;
