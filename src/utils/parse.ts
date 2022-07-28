import { IModule } from "../types/modules";

export function parseModule(paramsStr: string) {
  const modules: IModule = {};
  paramsStr.split("&").forEach((item) => {
    const [moduleName, paramsStr = ''] = item.split("@");
    if (!paramsStr) {
      modules[moduleName] = null;
      return;
    }
    const params = paramsStr.split(",").reduce((params, current) => {
      const [key, value] = current.split("=");
      params[key] = value;
      return params;
    }, {});
    modules[moduleName] = params;
  });
  return modules;
}

