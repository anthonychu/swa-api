import { AuthenticatedUser, AuthorizationOptions, decodeAuthInfo } from "./auth";
import { HttpRequest } from "./serverlessfunctions";

export class FunctionBuilder<T extends FunctionBuilderContext> {
    protected context: T;

    constructor(private builderFactory: (ctx: T) => FunctionBuilder<T>, private contextType: new () => T, context?: T) {
        this.context = new contextType();
        if (context) {
            Object.assign(this.context, context);
        }
    }

    allow(options: AuthorizationOptions): FunctionBuilder<T> {
        if (this.context.authorizationOptions) {
            throw "Cannot call allow() or allowAuthenticated() more than once.";
        }
        const newContext = new this.contextType();
        newContext.authorizationOptions = options;
        return this.builderFactory(newContext);
    }

    allowAuthenticated(): FunctionBuilder<T> {
        return this.allow({ userRoles: [ "authenticated" ] });
    }

    protected decodeAuthInfo(req?: HttpRequest): AuthenticatedUser | undefined {
        return decodeAuthInfo(req);
    }

    protected isAuthorized(authenticatedUser?: AuthenticatedUser): boolean {
        const allowAnonymous = this.context.authorizationOptions;
        if (!allowAnonymous) return true;

        if (!authenticatedUser) return false;

        if (this.context.authorizationOptions?.userRoles) {
            const matchingRoles = 
                authenticatedUser.userRoles.filter(value => this.context.authorizationOptions?.userRoles?.includes(value));
            if (matchingRoles.length > 0) {
                return true;
            }
        }

        if (this.context.authorizationOptions?.userDetails) {
            if (this.context.authorizationOptions.userDetails.includes(authenticatedUser.userDetails)) {
                return true;
            }
        }

        if (this.context.authorizationOptions?.userIds) {
            if (this.context.authorizationOptions.userIds.includes(authenticatedUser.userId)) {
                return true;
            }
        }

        return false;
    }
}

export class FunctionBuilderContext {
    public authorizationOptions?: AuthorizationOptions;
}