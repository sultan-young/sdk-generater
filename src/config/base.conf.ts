import path from 'path';

interface baseConfInterface {
    APP_NAME: string | undefined,
    APP_ENV: string | undefined,
    APP_ENV_TYPE: string | undefined,
    SERVER: {
        BASE: {
            HOST: string | undefined,
            PORT: number | undefined
        }
    },
    BASE_PATH: string,
    CTRL_PATH: string,
    SERVICE_PATH: string,
    SDK_BUNDLE_PATH: string,
    INTERFACE_CACHE_TIME: number
}

export const baseConf: baseConfInterface = {
    "APP_NAME"    : "h5_service",
    "APP_ENV"     : process.env.APP_ENV,
    "APP_ENV_TYPE": process.env.APP_ENV_TYPE,
    'SERVER'      : {
        'BASE': {
            'HOST': process.env.APP_HOST,
            'PORT': Number(process.env.APP_PORT)
        }
    },
    "BASE_PATH"   : path.join(__dirname, '..'),
    "CTRL_PATH"   : path.join(__dirname, '../controller'),
    "SERVICE_PATH": path.join(__dirname, '../service'),
    "SDK_BUNDLE_PATH": path.join(__dirname, process.env.APP_ENV === 'production' ? './sdk' : '../../dist/sdk'),
    "INTERFACE_CACHE_TIME": Number(process.env.INTERFACE_CACHE_TIME)
};