import { AuthorizationOptions, FunctionBuilder, FunctionBuilderContext } from "./functionbuilder";
import { HttpContext } from "./httpcontext";
import { HttpForm, HttpFormFile, HttpRequest, ServerlessFunction } from "./serverlessfunctions";
import Busboy from "busboy";

export class HttpFunctionBuilder extends FunctionBuilder<FunctionBuilderContext> {
    constructor(context?: FunctionBuilderContext) {
        const factory = (ctx: FunctionBuilderContext) => new HttpFunctionBuilder(ctx);
        super(factory, FunctionBuilderContext, context);
    }

    allow(options: AuthorizationOptions): HttpFunctionBuilder {
        return super.allow(options) as HttpFunctionBuilder;
    }

    allowAuthenticated(): HttpFunctionBuilder {
        return super.allowAuthenticated() as HttpFunctionBuilder;
    }

    onRequest(func: (context: HttpContext) => void | Promise<void>): ServerlessFunction {
        return async (funcContext) => {
            const httpContext = new HttpContext(funcContext);
            await httpContext.initializeServices();
            
            httpContext.user = this.decodeAuthInfo(funcContext.req);
            if (!this.isAuthorized(httpContext.user)) {
                funcContext.res = { status: httpContext.user ? 403 : 401 };
                return;
            }

            const req = funcContext.req as HttpRequest;
            if (req && req.headers['content-type'] && req.headers['content-type'].startsWith('multipart/form-data')) {
                req.form = await this.parseMultipartData(req);
            }

            await Promise.resolve(func(httpContext));
        };
    }

    private parseMultipartData(req: HttpRequest): Promise<HttpForm> {
        return new Promise(function (resolve, reject) {
            const busboy = new Busboy({ headers: req.headers });
            const form: HttpForm = {};

            busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
                const fieldData: unknown[] = [];

                const formFile: HttpFormFile = {
                    filename,
                    encoding,
                    mimetype
                };

                file.on('data', function (data) {
                    fieldData.push(...data);
                });

                file.on('end', function () {
                    formFile.data = Buffer.from(fieldData);
                    form[fieldname] = formFile;
                });
            });

            busboy.on('field', function (fieldname, val) {
                form[fieldname] = val;
            });

            busboy.on('finish', function () {
                resolve(form);
            });

            busboy.on('error', reject);

            busboy.write(req.body);
        });
    }
}