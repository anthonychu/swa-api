import { HttpRequest } from "@azure/functions";

export function decodeAuthInfo(req?: HttpRequest): AuthenticatedUser | undefined {
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