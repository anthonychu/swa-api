import { HttpContext } from "./httpcontext";
import { ServerlessFunction } from "./serverlessfunctions";
export declare class HttpBuilder {
    private context;
    constructor(context?: HttpBuilderContext);
    allow(options: AuthorizationOptions): HttpBuilder;
    allowAuthenticated(): HttpBuilder;
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
//# sourceMappingURL=httpbuilder.d.ts.map