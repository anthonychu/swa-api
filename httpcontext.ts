import { Context } from "@azure/functions";
import { BaseHttpContext } from "./basehttpcontext";
import { HttpRequest, HttpResponse } from "./serverlessfunctions";

export class HttpContext extends BaseHttpContext {
    req?: HttpRequest;
    res?: HttpResponse;

    constructor(context: Context) {
        super(context);
        this.req = context.req;
        this.res = context.res as HttpResponse;
    }
}