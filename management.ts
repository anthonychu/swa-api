import { Context } from "@azure/functions";
import { SignalRClient } from "./signalr";

async function swaManagementFunction(context: Context): Promise<void> {
    const route = context.bindingData.route;
    context.log(`Management function triggered: ${route}`);
    switch (route) {
        case "realtime/negotiate":
            context.res?.json(SignalRClient.fromConnectionString().generateNegotiatePayload());
            break;
    }
}

const swaManagementFunctionJson = {
    "disabled": false,
    "bindings": [
        {
            "authLevel": "anonymous",
            "type": "httpTrigger",
            "direction": "in",
            "name": "req",
            "route": "management/{*route}"
        },
        {
            "type": "http",
            "direction": "out",
            "name": "res"
        }
    ]
};

export {
    swaManagementFunction,
    swaManagementFunctionJson
};