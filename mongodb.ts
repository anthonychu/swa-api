import { Db, MongoClient } from "mongodb";
import constants from "./constants";

export class MongoDb {
    private static initializeTask: Promise<Db>;
    private static async initializeClient(): Promise<Db> {
        console.log("Initializing database...");

        const connectionString = process.env[constants.mongoConnectionStringSettingName];
        if (!connectionString) {
            throw "MongoDB connection string is missing."
        }

        const client = new MongoClient(connectionString, { useUnifiedTopology: true });
        await client.connect();
        const databaseName = process.env[constants.mongoDatabaseNameSettingName] ?? constants.mongoDefaultDatabaseName;
        const database = client.db(databaseName);
        return database;
    }

    public static getClient(): Promise<Db> {
        if (!this.initializeTask) {
            this.initializeTask = this.initializeClient();
        }
        return this.initializeTask;
    }


}