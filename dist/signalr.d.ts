export declare class SignalRClient {
    private endpoint;
    private accessKey;
    private hubName;
    private static defaultHubName;
    constructor(endpoint: string, accessKey: string, hubName: string);
    static fromConnectionString(connectionString?: string): SignalRClient;
    send(eventName: string, eventData?: unknown, options?: SendOptions): Promise<void>;
    addUserToGroup(userId: string, groupName: string): Promise<void>;
    removeUserFromAllGroups(userId: string): Promise<void>;
    generateNegotiatePayload(userId?: string): NegotiatePayload;
    private generateAccessToken;
}
interface NegotiatePayload {
    accessToken: string;
    url: string;
}
interface SendOptions {
    userId?: string;
    groupName?: string;
}
export {};
//# sourceMappingURL=signalr.d.ts.map