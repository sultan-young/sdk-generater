import path from "path";
import { pathUrl, sdkMd5, sdkType } from "../../types/modules";
import fs from "fs";
import {config} from "../../config";
import { getSdkTypeByFileName } from "../../utils/sdk";



export class SdkCache {
    cache = new Map<sdkType, Map<sdkMd5, pathUrl>>();

    constructor() {
        this.initCache();
    }

    initCache() {
        const h5sdkPath = path.join(config.SDK_BUNDLE_PATH, "./");
        const h5sdk_files_temp = fs.readdirSync(h5sdkPath);
        h5sdk_files_temp.forEach(fileName => {
            const { type, md5, path } = getSdkTypeByFileName(fileName);
            if (fileName.indexOf('.sdk') >= 0) {
                this.set(type, md5, path);
            }
        });
    }

    get(sdkType: sdkType,sdkMd5: sdkMd5) {
        if (!this.cache.has(sdkType)) {
            return null;
        }
        return this.cache.get(sdkType)?.get(sdkMd5);
    }

    private getSdkMap(type: sdkType) {
        return this.cache.get(type);
    }

    appendSdkType(sdkType: sdkType) {
        const sdkMap = new Map();
        this.cache.set(sdkType, sdkMap);
        return sdkMap;
    }

    set(type: sdkType, md5: sdkMd5, pathUrl: pathUrl) {
        let targetSdkMap = this.getSdkMap(type);
        if (!targetSdkMap) {
            targetSdkMap = this.appendSdkType(type)
        };
        targetSdkMap.set(md5, pathUrl);
        // this.cache.set(sdkMd5, path);
    }
    
}

const sdkCache = new SdkCache();
export {
    sdkCache,
}