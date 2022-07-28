import development from "./development.conf";
import production  from "./production.conf";
import {baseConf}  from "./base.conf";
import {hostConf}  from "./host";

export const config = Object.assign(baseConf, hostConf, baseConf.APP_ENV === 'development' ? development : production);