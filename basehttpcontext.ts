import { Realtime } from "./realtime";
import { Logger } from "./serverlessfunctions";
import { Db } from "mongodb";

export class BaseHttpContext {
    log?: Logger;
    db?: Db;
    realtime = new Realtime();
}