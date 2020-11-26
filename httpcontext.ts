import { BaseHttpContext } from "./basehttpcontext";
import { HttpRequest, HttpResponse } from "./serverlessfunctions";

export class HttpContext extends BaseHttpContext {
    req?: HttpRequest;
    res?: HttpResponse;
}