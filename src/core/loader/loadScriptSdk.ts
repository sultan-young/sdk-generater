import { getSdkMd5 } from "../../utils/sdk";
import { sdkCache } from "./cache";
import fs from 'fs'

export const loadScriptSdk = (moduleName: string, payload: any) => {
    // return sdkConfig(moduleName);
    let targetSdkPath = sdkCache.get(moduleName, getSdkMd5(payload));
    console.log('targetSdkPath', targetSdkPath, moduleName);
    if (!targetSdkPath) {
        targetSdkPath = '';
    };
    return fs.readFileSync(targetSdkPath);
};
