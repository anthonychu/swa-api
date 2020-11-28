import { SignalRClient } from "./signalr";
export declare class Realtime {
    private signalRClient;
    constructor(signalRClient?: SignalRClient);
    /**
     * Sends a realtime event to all connected clients.
     *
     * @param eventName - name of the event to raise
     * @param data - event data
     */
    send(eventName: string, data?: unknown): Promise<void>;
    user(userId: string): Promise<UserRealtime>;
    group(groupName: string): Promise<GroupRealtime>;
}
declare class UserRealtime {
    private signalRClient;
    private userId;
    constructor(signalRClient: SignalRClient, userId: string);
    send(eventName: string, data?: unknown): Promise<void>;
}
declare class GroupRealtime {
    private signalRClient;
    private groupName;
    constructor(signalRClient: SignalRClient, groupName: string);
    send(eventName: string, data?: unknown): Promise<void>;
}
export {};
//# sourceMappingURL=realtime.d.ts.map