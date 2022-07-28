import md5 from 'md5';
import path from 'path'
import { config } from '../config';

export function getSdkMd5(payload) {
    return md5(payload || '_default')
  }
  
export function getFileNameMd5(moduleName: string, payload: {[key: string]: string}) {
  return `${moduleName}_${getSdkMd5(payload)}`
}

export function getSdkTypeByFileName(fileName: string) {
    const [type, _, md5, extension] = fileName.split('.')
    return {
        type,
        md5,
        path: path.resolve(config.SDK_BUNDLE_PATH, fileName)
    }
}