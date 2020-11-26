import { HttpContext } from "./httpcontext";
import { HttpResponse, ServerlessFunction } from "./serverlessfunctions";

export class HttpFunctionBuilder {
    private context: HttpBuilderContext;

    constructor(context?: HttpBuilderContext) {
        this.context = new HttpBuilderContext();
        if (context) {
            Object.assign(this.context, context);
        }
    }

    allow(options: AuthorizationOptions): HttpFunctionBuilder {
        if (this.context.authorizationOptions) {
            throw "Cannot call allow() or allowAuthenticated() more than once.";
        }
        this.context.authorizationOptions = options;
        return new HttpFunctionBuilder(this.context);
    }

    allowAuthenticated(): HttpFunctionBuilder {
        return this.allow({ roles: [ 'authorized' ] });
    }

    onRequest(func: (context: HttpContext) => void | Promise<void>): ServerlessFunction {
        return async function (funcContext, ...args) {
            const httpContext = new HttpContext();
            httpContext.req = funcContext.req;
            httpContext.res = funcContext.res as HttpResponse;
            httpContext.log = funcContext.log;

            await Promise.resolve(func(httpContext));
        }
    }
}

class HttpBuilderContext {
    public authorizationOptions?: AuthorizationOptions;
}

interface AuthorizationOptions {
    users?: string[];
    roles?: string[];
}