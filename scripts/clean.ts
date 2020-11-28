import fs from "fs/promises";
import fsSync from "fs";
import path from "path";
import constants from "../constants";

async function clean() {
    const items = await fs.readdir(".");

    for (const item of items) {
        const functionJsonFile = path.join(item, "function.json");
        if (fsSync.existsSync(functionJsonFile)) {
            const functionJson = JSON.parse(await fs.readFile(functionJsonFile) as unknown as string);
            if (functionJson.generatedBy === "swa-api") {
                console.log(`Deleting folder ${item}`);
                await fs.rmdir(item, { recursive: true });
            }
        }
    }

    if (fsSync.existsSync(constants.managementFunctionName)) {
        if (fsSync.lstatSync(constants.managementFunctionName).isDirectory()) {
            console.log(`Deleting folder ${constants.managementFunctionName}`);
            await fs.rmdir(constants.managementFunctionName, { recursive: true });
        }
    }

    const hostJsonFile = "host.json";
    if (fsSync.existsSync(hostJsonFile)) {
        console.log(`Deleting ${hostJsonFile}`);
        await fs.unlink(hostJsonFile);
    }

    return "";
}

clean();