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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpContext = void 0;
var basehttpcontext_1 = require("./basehttpcontext");
var HttpContext = /** @class */ (function (_super) {
    __extends(HttpContext, _super);
    function HttpContext(context) {
        var _this = _super.call(this, context) || this;
        _this.req = context.req;
        _this.res = context.res;
        return _this;
    }
    return HttpContext;
}(basehttpcontext_1.BaseHttpContext));
exports.HttpContext = HttpContext;
