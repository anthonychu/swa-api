import { Db } from "mongodb";
export declare class MongoDb {
    private static initializeTask;
    private static skipDatabase;
    private static initializeClient;
    static getClient(): Promise<Db | undefined>;
}
//# sourceMappingURL=mongodb.d.ts.map