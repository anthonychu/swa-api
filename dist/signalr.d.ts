export declare class SignalRClient {
    private endpoint;
    private accessKey;
    private hubName;
    private static defaultHubName;
    constructor(endpoint: string, accessKey: string, hubName: string);
    static fromConnectionString(connectionString?: string): SignalRClient;
    generateNegotiatePayload(userId?: string): NegotiatePayload;
}
interface NegotiatePayload {
    accessToken: string;
    url: string;
}
export {};
//# sourceMappingURL=signalr.d.ts.map