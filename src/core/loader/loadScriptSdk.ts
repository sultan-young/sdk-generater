import path from "path";
import fs from "fs";
import {config} from "../config";

const h5sdkPath = path.join(config.STATICS_PATH, "./scripts");
const h5sdk_files_temp = fs.readdirSync(h5sdkPath);
const jsSdks: {[moduleName: string]: string} = {};

h5sdk_files_temp.forEach(item => {
    if (item.indexOf('.sdk') >= 0) {
        const key  = item.substring(0, item.indexOf('.sdk')).toLocaleUpperCase();
        const file = fs.readFileSync(path.join(h5sdkPath, item)).toString();
        console.log('file', require(path.join(h5sdkPath, item)));
        jsSdks[key] = file;
    }
});

export const loadScriptSdk = (moduleName: string) => jsSdks[moduleName.toLocaleUpperCase()];
