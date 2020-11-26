export declare class FunctionBuilder<T extends FunctionBuilderContext> {
    private builderFactory;
    private contextType;
    protected context: T;
    constructor(builderFactory: (ctx: T) => FunctionBuilder<T>, contextType: new () => T, context?: T);
    allow<U>(options: AuthorizationOptions): FunctionBuilder<T>;
    allowAuthenticated(): FunctionBuilder<T>;
}
export declare class FunctionBuilderContext {
    authorizationOptions?: AuthorizationOptions;
}
export interface AuthorizationOptions {
    users?: string[];
    roles?: string[];
}
//# sourceMappingURL=functionbuilder.d.ts.map