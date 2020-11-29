import { Context } from "@azure/functions";
import { decodeAuthInfo } from "./auth";
import constants from "./constants";
import { SignalRClient } from "./signalr";

async function swaManagementFunction(context: Context): Promise<void> {
    const route = context.bindingData.route;
    context.log(`Management function triggered: ${route}`);
    switch (route) {
        case "realtime/negotiate":
            await signalRNegotiate(context)
            break;
    }
}

async function signalRNegotiate(context: Context): Promise<void> {
    const user = decodeAuthInfo(context.req);
    const client = SignalRClient.fromConnectionString();
    if (user) {
        await client.removeUserFromAllGroups(user.userId);
        for (const role of user.userRoles) {
            if (role !== constants.anonymousUserRoleName) {
                await client.addUserToGroup(user.userId, role);
            }
        }
        await client.addUserToGroup(user.userId, getUserDetailGroupName(user.userDetails));
    }
    context.res?.json(client.generateNegotiatePayload(user?.userId));
}

function getUserDetailGroupName (userDetails: string) : string {
    return `userdetail_${userDetails.replace(/[^A-Za-z0-9]/g, "_")}`;
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