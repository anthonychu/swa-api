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
    }): Promise<void>;
    deleteDocument(_id: string): Promise<void>;
    getDocument(_id: string): Promise<{
        [field: string]: unknown;
    } | null>;
    findDocuments(query?: {
        [field: string]: unknown;
    }, options?: FindDocumentsOptions): Promise<{
        [field: string]: unknown;
    }[]>;
}
export interface FindDocumentsOptions {
    sort: {
        [field: string]: number;
    };
    projection: {
        [field: string]: number;
    };
    limit: number;
    skip: number;
}
//# sourceMappingURL=database.d.ts.map