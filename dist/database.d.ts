import { Db } from "mongodb";
export interface Database {
    collection(name: string): Collection;
    mongoDb: Db;
}
export interface Collection {
    insertDocument(doc: {
        [field: string]: unknown;
    }): Promise<string>;
    replaceDocument(doc: {
        [field: string]: unknown;
    }, additionalQuery?: {
        [field: string]: unknown;
    }): Promise<void>;
    deleteDocument(_id: string, additionalQuery?: {
        [field: string]: unknown;
    }): Promise<void>;
    getDocument(_id: string, additionalQuery?: {
        [field: string]: unknown;
    }): Promise<{
        [field: string]: unknown;
    } | null>;
    findDocuments(query?: {
        [field: string]: unknown;
    }, options?: FindDocumentsOptions): Promise<{
        [field: string]: unknown;
    }[]>;
}
export interface FindDocumentsOptions {
    sort?: {
        [field: string]: number;
    };
    projection?: {
        [field: string]: number;
    };
    limit?: number;
    skip?: number;
}
export declare class DatabaseConfigHelper {
    config(databaseConfig: DatabaseConfig): DatabaseConfig;
}
export interface DatabaseConfig {
    collections?: {
        [collectionName: string]: DatabaseConfigCollection;
    };
}
interface DatabaseConfigCollection {
    permissions?: DatabaseConfigCollectionPermission[];
    notifyOnChange?: boolean;
}
export interface DatabaseConfigCollectionPermission {
    operations?: DatabaseOperationType[];
    allowedRoles?: ("authenticated" | string)[];
    restrictDocsByUser?: boolean;
}
export declare type DatabaseOperationType = "insertDocument" | "replaceDocument" | "deleteDocument" | "getDocument" | "findDocuments";
export {};
//# sourceMappingURL=database.d.ts.map