/* eslint-disable @typescript-eslint/no-empty-interface */

import { AzureFunction, Context, HttpRequest as Req, Logger as Log } from "@azure/functions";

export interface ServerlessFunction extends AzureFunction {}
export interface Logger extends Log {}
export interface HttpRequest extends Req {}
export interface ServerlessFunctionContext extends Context {}

export interface HttpResponse {
    status: number;
    headers: { [name: string]: string };
    body: unknown;
    json: (body: unknown) => void;
}