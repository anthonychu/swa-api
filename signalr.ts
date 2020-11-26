import * as jwt from "jsonwebtoken";
import { ServerlessFunction, ServerlessFunctionContext } from "./serverlessfunctions";

export class SignalRClient {
    private static defaultHubName = "default";

    constructor(private endpoint: string, private accessKey: string, private hubName: string) {
    }

    static fromConnectionString(connectionString?: string): SignalRClient {
        connectionString = connectionString ?? process.env.SWA_SIGNALR_CONNECTION_STRING;

        if (!connectionString) {
            throw "No SignalR Service connection string found."
        }

        const endpointMatch = /\bEndpoint=([^;]+)/i.exec(connectionString);
        const endpoint = endpointMatch?.[1];
        const accessKeyMatch = /\bAccessKey=([^;]+)/i.exec(connectionString);
        const accessKey = accessKeyMatch?.[1];
        if (!(endpoint && accessKey)) {
            throw "Could not parse SignalR Service connection string.";
        }

        return new SignalRClient(endpoint, accessKey, this.defaultHubName);
    }

    generateNegotiatePayload(userId?: string): NegotiatePayload {
        const hubUrl = `${this.endpoint}/client/?hub=${this.hubName}`;
        const payload: JwtPayload = {
            aud: hubUrl,
            iat: Math.floor(Date.now() / 1000) - 30,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
        };
        if (userId) {
            payload.nameid = userId;
        }
        const accessToken = jwt.sign(payload, this.accessKey);

        return {
            accessToken,
            url: hubUrl
        };
    }
}

interface JwtPayload {
    aud: string;
    iat: number;
    exp: number;
    nameid?: string;
}

interface NegotiatePayload {
    accessToken: string;
    url: string;
}