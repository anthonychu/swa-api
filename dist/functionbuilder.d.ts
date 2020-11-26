import { HttpRequest } from "./serverlessfunctions";
export declare class FunctionBuilder<T extends FunctionBuilderContext> {
    private builderFactory;
    private contextType;
    protected context: T;
    constructor(builderFactory: (ctx: T) => FunctionBuilder<T>, contextType: new () => T, context?: T);
    allow<U>(options: AuthorizationOptions): FunctionBuilder<T>;
    allowAuthenticated(): FunctionBuilder<T>;
    protected decodeAuthInfo(req?: HttpRequest): AuthenticatedUser | undefined;
    protected isAuthorized(authenticatedUser?: AuthenticatedUser): boolean;
}
export declare class FunctionBuilderContext {
    authorizationOptions?: AuthorizationOptions;
}
export interface AuthorizationOptions {
    userDetails?: string[];
    userIds?: string[];
    userRoles?: string[];
}
export interface AuthenticatedUser {
    identityProvider: string;
    userId: string;
    userDetails: string;
    userRoles: string[];
}
//# sourceMappingURL=functionbuilder.d.ts.map