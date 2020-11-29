import { SignalRClient } from "./signalr";

export class Realtime {
    private signalRClient: SignalRClient;
    constructor (signalRClient?: SignalRClient) {
        this.signalRClient = signalRClient ?? SignalRClient.fromConnectionString();
    }

    /**
     * Sends a realtime event to all connected clients.
     * 
     * @param eventName - name of the event to raise
     * @param data - event data
     */
    public async send(eventName: string, data?: unknown): Promise<void> {
        await this.signalRClient.send(eventName, data);
    }

    public user(userId: string): UserRealtime {
        return new UserRealtime(this.signalRClient, userId);
    }

    public group(groupName: string): GroupRealtime {
        return new GroupRealtime(this.signalRClient, groupName);
    }
}

class UserRealtime {
    constructor(private signalRClient: SignalRClient, private userId: string) {
    }

    public async send(eventName: string, data?: unknown): Promise<void> {
        await this.signalRClient.send(eventName, data, { userId: this.userId });
    }
}

class GroupRealtime {
    constructor(private signalRClient: SignalRClient, private groupName: string) {
    }

    public async send(eventName: string, data?: unknown): Promise<void> {
        await this.signalRClient.send(eventName, data, { groupName: this.groupName });
    }
}