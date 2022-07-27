import { loadScriptSdk } from "../loader/loadScriptSdk";


class JsGenerater {
    
    build(modules: {[key: string]: object}) {
        let template = ''
        for (let moduleKey in modules) {
            const moduleTmp = loadScriptSdk(moduleKey)
            const returnObj =  `Object.assign(window.jsSdk, {${moduleKey}: ${moduleKey}})`
            template += `\n${moduleTmp}\n${returnObj}`;
            // Object.assign(window.jsSdk, ${H5SDK_RETURN});
        }
        return this.concatInitalTemplate(template);
    }

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

const jsGenerater = new JsGenerater();

export default jsGenerater;