import { Context } from "@azure/functions";
import { AuthenticatedUser, decodeAuthInfo } from "./auth";
import constants from "./constants";
import { Collection, FindDocumentsOptions } from "./database";
import { MongoDb } from "./mongodb";
import { SignalRClient } from "./signalr";

async function swaManagementFunction(context: Context): Promise<void> {
    const route = context.bindingData.route;
    const user = decodeAuthInfo(context.req);
    context.log(`Management function triggered: ${route}`);
    switch (route) {
        case "realtime/negotiate":
            await signalRNegotiate(context, user);
            return;
        case "database/operation":
            await processDatabaseOperation(context, user);
            return;
    }
}

async function processDatabaseOperation(context: Context, user?: AuthenticatedUser): Promise<void> {
    if (context.req?.method !== "POST") {
        if (context.res) {
            context.res.status = 400;
        }
        return;
    }

    if (!user) {
        if (context.res) {
            context.res.status = 401;
        }
        return;
    }

    // TODO: perform authorization here

    const payload = context.req?.body as DatabaseOperation;
    const database = await MongoDb.getClient(user);
    const collection = database?.collection(payload.collection);

    if (!database || !collection || !payload.collection) {
        setResponse(context, 400);
        return;
    }

    switch (payload.operation) {
        case "getDocument":
            await getDocumentOperation(collection, payload, context);
            return;
        case "findDocuments":
            await findDocumentsOperation(collection, payload, context);
            return;
        case "insertDocument":
            await insertDocumentOperation(collection, payload, context);
            return;
        case "replaceDocument":
            await replaceDocumentOperation(collection, payload, context);
            return;
        case "deleteDocument":
            await deleteDocumentOperation(collection, payload, context);
            return;
    }
}

async function getDocumentOperation(collection: Collection, payload: DatabaseOperation, context: Context) {
    const result = await collection.getDocument(payload._id);
    setResponse(context, 200, { result });
}

async function findDocumentsOperation(collection: Collection, payload: DatabaseOperation, context: Context) {
    const result = await collection.findDocuments(payload.query, payload.options);
    setResponse(context, 200, { result });
}

async function insertDocumentOperation(collection: Collection, payload: DatabaseOperation, context: Context) {
    const result = await collection.insertDocument(payload.doc);
    setResponse(context, 200, { result });
}

async function replaceDocumentOperation(collection: Collection, payload: DatabaseOperation, context: Context) {
    await collection.replaceDocument(payload.doc);
    setResponse(context, 200);
}

async function deleteDocumentOperation(collection: Collection, payload: DatabaseOperation, context: Context) {
    await collection.deleteDocument(payload._id);
    setResponse(context, 200);
}

function setResponse(context: Context, status: number, body?: unknown) {
    if (context.res) {
        context.res.status = status;
        context.res.headers = {
            "Content-Type": "application/json"
        };
        if (body) {
            context.res.body = body;
        }
    }
}

interface DatabaseOperation {
    operation: "insertDocument" | "replaceDocument" | "deleteDocument" | "getDocument" | "findDocuments";
    collection: string;
    _id: string;
    doc: { [field: string]: unknown };
    query?: { [field: string]: unknown };
    options?: FindDocumentsOptions;
}

async function signalRNegotiate(context: Context, user?: AuthenticatedUser): Promise<void> {
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

function getUserDetailGroupName(userDetails: string): string {
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