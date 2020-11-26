"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseHttpContext = void 0;
var realtime_1 = require("./realtime");
var BaseHttpContext = /** @class */ (function () {
    function BaseHttpContext() {
        this.realtime = new realtime_1.Realtime();
    }
    return BaseHttpContext;
}());
exports.BaseHttpContext = BaseHttpContext;
