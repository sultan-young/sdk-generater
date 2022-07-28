import {pvId} from "./getUnique.util";
import {isIOS} from './tool.util';
import {getUrlQueryParams} from './tool.util';
import {PLATFORM_ID, IS_H5_OR_OTHER, EVENT_TYPE} from '../enum/pv.enum';

export const getCommonParams = (options: { sa_distinct_id?: string, product_id?: string | number, country_name?: string }) => {
	const {countryCode, appVersion, appTypeId} = getUrlQueryParams();
	const {sa_distinct_id, product_id, country_name} = options;
	const params = {
		event_time: new Date().getTime(),
		platform_id: PLATFORM_ID.H5,
		is_h5_or_other: IS_H5_OR_OTHER.WEB_SITE_H5,
		country_code: countryCode,
		version: appVersion,
		app_language: navigator.language,
		event_type: EVENT_TYPE.NORMAL,
		product_id: Number(product_id) || Number(appTypeId),
		country_name: country_name || '',
		city_name: ''
	};
	if (options.sa_distinct_id) {
		return {...params, sa_distinct_id, device_id: isIOS ? 1 : 2, pv_id: pvId};
	} else {
		return params;
	}
}
