import { HttpRequest } from "@azure/functions";
export declare function decodeAuthInfo(req?: HttpRequest): AuthenticatedUser | undefined;
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
//# sourceMappingURL=auth.d.ts.map