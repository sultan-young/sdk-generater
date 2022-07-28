import { paramsArr } from '../config/params.config';
import { AnyObject } from '../type/params.type';

// 循环输出所有的地址的参数 
export const getUrlQueryParams = (address: string = location.href): AnyObject => {
    const url = new URL(address);
    const params: AnyObject = {};
    paramsArr.forEach((item: string) => params[item] = url.searchParams.get(item) || '');
    return { ...params };
}

// 判断是否是ios
export const isIOS: boolean = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
