export interface IModuleParams {
    [key: string]: string;
}

export interface IModule { [key: string]: IModuleParams | null }

export type sdkType = string;
export type sdkMd5 = string;
export type pathUrl = string;