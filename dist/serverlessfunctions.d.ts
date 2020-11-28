/// <reference types="node" />
import { AzureFunction, Context, HttpRequest as Req, Logger as Log } from "@azure/functions";
export interface ServerlessFunction extends AzureFunction {
}
export interface Logger extends Log {
}
export interface HttpRequest extends Req {
    form?: HttpForm;
}
export interface ServerlessFunctionContext extends Context {
}
export declare type HttpForm = {
    [fieldname: string]: HttpFormFile | string;
};
export interface HttpFormFile {
    filename: string;
    encoding: string;
    mimetype: string;
    data?: Buffer;
}
export interface HttpResponse {
    status: number;
    headers: {
        [name: string]: string;
    };
    body: unknown;
    json: (body: unknown) => void;
}
//# sourceMappingURL=serverlessfunctions.d.ts.map