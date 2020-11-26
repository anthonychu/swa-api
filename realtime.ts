import { ServerlessFunction, ServerlessFunctionContext } from "./serverlessfunctions";
import { SignalRClient } from "./signalr";

export class Realtime {
    /**
     * Sends a realtime event to all connected clients.
     * 
     * @param eventName - name of the event to raise
     * @param data - event data
     */
    public async send(eventName: string, data?: unknown): Promise<void> {
        return;
    }

    public static generateNegotiateFunction(): ServerlessFunction {
        return (context?: ServerlessFunctionContext) => {
            context?.res?.json(SignalRClient.fromConnectionString().generateNegotiatePayload());
        };
    }
}