import * as jwt from "jsonwebtoken";
import fetch from "node-fetch";

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

    public async send(eventName: string, eventData?: unknown, options?: SendOptions): Promise<void> {
        const hubUrl = `${this.endpoint}/api/v1/hubs/${this.hubName}`;
        const accessToken = this.generateAccessToken(hubUrl);

        const payload: SendPayload = {
            target: eventName,
            arguments: [ eventData ]
        };

        if (options?.userId) {
            payload.userId = options.userId;
        } else if (options?.groupName) {
            payload.groupName = options.groupName;
        }

        await fetch(hubUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(payload)
        });
    }

    generateNegotiatePayload(userId?: string): NegotiatePayload {
        const hubUrl = `${this.endpoint}/client/?hub=${this.hubName}`;
        const accessToken = this.generateAccessToken(hubUrl, userId);

        return {
            accessToken,
            url: hubUrl
        };
    }

    private generateAccessToken(url: string, userId?: string) {
        const payload: JwtPayload = {
            aud: url,
            iat: Math.floor(Date.now() / 1000) - 30,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
        };
        if (userId) {
            payload.nameid = userId;
        }
        const accessToken = jwt.sign(payload, this.accessKey);
        return accessToken;
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

interface SendPayload {
    target: string;
    arguments: unknown[];
    userId?: string;
    groupName?: string;
}

interface SendOptions {
    userId?: string;
    groupName?: string;
}