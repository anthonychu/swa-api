export class FunctionBuilder<T extends FunctionBuilderContext> {
    protected context: T;
    
    constructor(private builderFactory: (ctx: T) => FunctionBuilder<T>, private contextType: new () => T, context?: T) {
        this.context = new contextType();
        if (context) {
            Object.assign(this.context, context);
        }
    }

    allow<U>(options: AuthorizationOptions): FunctionBuilder<T> {
        if (this.context.authorizationOptions) {
            throw "Cannot call allow() or allowAuthenticated() more than once.";
        }
        this.context.authorizationOptions = options;
        return this.builderFactory(this.context);
    }

    allowAuthenticated(): FunctionBuilder<T> {
        return this.allow({ roles: [ 'authorized' ] });
    }
}

export class FunctionBuilderContext {
    public authorizationOptions?: AuthorizationOptions;
}

export interface AuthorizationOptions {
    users?: string[];
    roles?: string[];
}