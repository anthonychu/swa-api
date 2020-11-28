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
        if (!req) return;

        // This block sets a development user that has rights to upload
        // TODO: find a better way to do this
        if (process.env.AZURE_FUNCTIONS_ENVIRONMENT === "Development") {
            return {
                identityProvider: "github",
                userId: "17baeed9bn1sa3e5dbs24283",
                userDetails: "testuser",
                userRoles: ["admin", "anonymous", "authenticated"],
            };
        }

        const clientPrincipalHeader = "x-ms-client-principal";

        if (req.headers[clientPrincipalHeader] == null) {
            return;
        }
        const buffer = Buffer.from(req.headers[clientPrincipalHeader], "base64");
        const serializedJson = buffer.toString("ascii");
        return JSON.parse(serializedJson);
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

export interface AuthorizationOptions {
    // TODO: userDetails is a weird word for username
    userDetails?: string[];
    userIds?: string[];
    userRoles?: string[];
}

export interface AuthenticatedUser {
    identityProvider: string,
    userId: string,
    userDetails: string,
    userRoles: string[]
}