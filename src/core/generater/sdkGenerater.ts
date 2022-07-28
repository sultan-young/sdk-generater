import { IModule } from "../../types/modules";
import { loadScriptSdk } from "../loader/loadScriptSdk";
const gulp = require("gulp");


class SdkGenerager {
    
    build(modules: IModule) {
        let template = ''
        for (let moduleKey in modules) {
            const moduleTmp = loadScriptSdk(moduleKey, modules[moduleKey]);
            const returnObj =  `Object.assign(window.jsSdk, {${moduleKey}: ${moduleKey}})`
            template += `\n${moduleTmp}\n${returnObj}`;
            // Object.assign(window.jsSdk, ${H5SDK_RETURN});
        }
        return this.concatInitalTemplate(template);
    };

    concatInitalTemplate(content: string) {
        return `
(function(){
    if (!window.jsSdk) {
        window.jsSdk = {};
    }  
    ${content}
}());`
    }
}

const sdkGenerager = new SdkGenerager();

export default sdkGenerager;