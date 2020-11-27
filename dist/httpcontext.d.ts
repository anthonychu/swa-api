import { Context } from "@azure/functions";
import { BaseHttpContext } from "./basehttpcontext";
import { HttpRequest, HttpResponse } from "./serverlessfunctions";
export declare class HttpContext extends BaseHttpContext {
    req?: HttpRequest;
    res?: HttpResponse;
    constructor(context: Context);
}
//# sourceMappingURL=httpcontext.d.ts.map