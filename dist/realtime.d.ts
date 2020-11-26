import { ServerlessFunction } from "./serverlessfunctions";
export declare class Realtime {
    /**
     * Sends a realtime event to all connected clients.
     *
     * @param eventName - name of the event to raise
     * @param data - event data
     */
    send(eventName: string, data?: unknown): Promise<void>;
    static generateNegotiateFunction(): ServerlessFunction;
}
//# sourceMappingURL=realtime.d.ts.map