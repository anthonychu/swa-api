import { AuthorizationOptions, FunctionBuilder, FunctionBuilderContext } from "./functionbuilder";
import { HttpContext } from "./httpcontext";
import { HttpResponse, ServerlessFunction } from "./serverlessfunctions";

export class HttpFunctionBuilder extends FunctionBuilder<FunctionBuilderContext> {
    constructor(context?: FunctionBuilderContext) {
        const factory = (ctx: FunctionBuilderContext) => new HttpFunctionBuilder(ctx);
        super(factory, FunctionBuilderContext, context);
    }

    allow(options: AuthorizationOptions): HttpFunctionBuilder {
        return super.allow(options) as HttpFunctionBuilder;
    }

    allowAuthenticated(): HttpFunctionBuilder {
        return super.allowAuthenticated() as HttpFunctionBuilder;
    }

    onRequest(func: (context: HttpContext) => void | Promise<void>): ServerlessFunction {
        return async (funcContext, ...args) => {
            const httpContext = new HttpContext();
            httpContext.req = funcContext.req;
            httpContext.res = funcContext.res as HttpResponse;
            httpContext.log = funcContext.log;
            
            await Promise.resolve(func(httpContext));
        };
    }
}
