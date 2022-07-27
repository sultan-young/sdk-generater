function parseModule(paramsStr: string) {
  const modules: { [key: string]: any } = {};
  paramsStr.split("&").forEach((item) => {
    const [moduleName, paramsStr] = item.split("@");
    const params = paramsStr.split(",").reduce((params, current) => {
      const [key, value] = current.split("=");
      params[key] = value;
      return params;
    }, {});
    modules[moduleName] = params;
  });
  return modules;
}

export { parseModule };
