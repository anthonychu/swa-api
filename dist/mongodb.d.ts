import { Database } from "./database";
import { AuthenticatedUser } from "./auth";
export declare class MongoDb {
    private static initializeTask;
    private static skipDatabase;
    private static client;
    private static getConnectionString;
    private static initializeClient;
    static getClient(user?: AuthenticatedUser): Promise<Database | undefined>;
}
//# sourceMappingURL=mongodb.d.ts.map