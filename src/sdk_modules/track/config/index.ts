import {CountryCode, HostItem} from "../type/params.type";
import hostMap from "../host";
import {getUrlQueryParams} from "../utils/tool.util";

export class SdkConfig {

	// 默认config
	public static config: { host: HostItem, product_id: string } = {
		product_id: '',
		host: hostMap['CN']
	}

	// 复写config
	public static init(params: { countryCode: CountryCode, product_id: string } | undefined = undefined) {
		const _countryCode = (params?.countryCode as undefined | CountryCode) || getUrlQueryParams()['countryCode'].toUpperCase() as CountryCode;
		SdkConfig.config = {
			product_id: params?.product_id || '',
			host: hostMap[_countryCode]
		}
	}

}
