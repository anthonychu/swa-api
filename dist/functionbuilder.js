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
        return this.allow({ roles: ['authorized'] });
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
