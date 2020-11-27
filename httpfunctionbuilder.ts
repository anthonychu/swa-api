import { AuthorizationOptions, FunctionBuilder, FunctionBuilderContext } from "./functionbuilder";
import { HttpContext } from "./httpcontext";
import { ServerlessFunction } from "./serverlessfunctions";

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
        return async (funcContext) => {
            const httpContext = new HttpContext(funcContext);
            await httpContext.initializeServices();
            await Promise.resolve(func(httpContext));
        };
    }
}
