import { promises as fs } from "fs";
import path from "path";
import { existsSync } from "fs";
import { swaManagementFunctionJson } from "../management";
import constants from "../constants";

async function generate() {
    if (existsSync(constants.managementFunctionName)) {
        throw `${constants.managementFunctionName} already exists. Unable to generate Azure Functions artifacts`;
    }

    await fs.mkdir(constants.managementFunctionName);

    await fs.writeFile(
        path.join(constants.managementFunctionName, "function.json"),
        JSON.stringify(swaManagementFunctionJson));
    console.log(`+ ${path.join(constants.managementFunctionName, "function.json")}`);

    await fs.writeFile(
        path.join(constants.managementFunctionName, "index.js"),
        `module.exports = require("swa-api/dist/management").swaManagementFunction;`);
    console.log(`+ ${path.join(constants.managementFunctionName, "index.js")}`);

    await generateFunctionFolders("http");
    await generateFunctionFolders("rpc");

    const hostJsonFile = 'host.json';
    await fs.writeFile(hostJsonFile, JSON.stringify({
        "version": "2.0",
        "logging": {
            "applicationInsights": {
                "samplingExcludedTypes": "Request",
                "samplingSettings": {
                    "isEnabled": true
                }
            }
        }
    }, null, 2));
    console.log(`+ ${hostJsonFile}`);
}

async function generateFunctionFolders(folder: "http" | "rpc") {
    const files = await fs.readdir(folder);
    for (const file of files.filter(f => f.endsWith('.js'))) {
        const fileStats = await fs.lstat(path.join(folder, file));
        if (fileStats.isFile()) {
            const functionName = path.parse(file).name.replace(/[^A-Za-z0-9]/g, " ").trim().replace(" ", "_");
            const functionFolderName = folder + "_" + functionName;

            await fs.mkdir(functionFolderName);

            /* eslint-disable @typescript-eslint/no-explicit-any*/
            const functionJson: any = {
                "generatedBy": "swa-api",
                "scriptFile": path.join('..', folder, file),
                "disabled": false,
                "bindings": [
                    {
                        "authLevel": "anonymous",
                        "type": "httpTrigger",
                        "direction": "in",
                        "name": "req"
                    },
                    {
                        "type": "http",
                        "direction": "out",
                        "name": "res"
                    }
                ]
            };

            if (folder === "http") {
                const methodMatch = /_(get|post|delete|put|patch|head|connect|options|trace)$/i.exec(functionName);
                const method = methodMatch?.[1].toLowerCase();
                if (method) {
                    functionJson.bindings[0].methods = [method];
                    functionJson.bindings[0].route = functionName.replace(new RegExp(`_${method}$`), "");
                } else {
                    functionJson.bindings[0].route = functionName;
                }
            } else {
                functionJson.bindings[0].methods = ["post"];
                functionJson.bindings[0].route = `rpc/${functionName}`;
            }

            await fs.writeFile(path.join(functionFolderName, 'function.json'), JSON.stringify(functionJson, null, 2));
            console.log(`+ ${path.join(functionFolderName, 'function.json')}`);
        }
    }
}

generate();