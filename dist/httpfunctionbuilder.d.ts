import { HttpContext } from "./httpcontext";
import { ServerlessFunction } from "./serverlessfunctions";
export declare class HttpFunctionBuilder {
    private context;
    constructor(context?: HttpBuilderContext);
    allow(options: AuthorizationOptions): HttpFunctionBuilder;
    allowAuthenticated(): HttpFunctionBuilder;
    onRequest(func: (context: HttpContext) => void | Promise<void>): ServerlessFunction;
}
declare class HttpBuilderContext {
    authorizationOptions?: AuthorizationOptions;
}
interface AuthorizationOptions {
    users?: string[];
    roles?: string[];
}
export {};
//# sourceMappingURL=httpfunctionbuilder.d.ts.map