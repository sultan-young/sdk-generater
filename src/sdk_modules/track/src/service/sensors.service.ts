import {AnyObject, SensorsParamsType} from '../type/params.type';
import sensors from '../libs/sensorsdata.lib';
import {getCommonParams} from '../utils/getCommonParams.util';
import {SdkConfig} from "../config";

class SensorsService {

	static isSensorsLock = false;

	static config = {
		heatmap: {
			clickmap: "default",
			scroll_notice_map: "default"
		},
		app_js_bridge: true,
		server_url: SdkConfig.config.host.SERVER_TRACK_URL
	}

	static init() {

		// 只需初始化一次
		if (!SensorsService.isSensorsLock) {
			sensors.init(SensorsService.config);
			SensorsService.isSensorsLock = true;
		}

		// 注册页面
		const {product_id, host} = SdkConfig.config;
		const options: SensorsParamsType = {
			...getCommonParams({
				product_id,
				country_name: host.COUNTRY_NAME
			})
		}
		sensors.registerPage(options);
		sensors.quick('autoTrack');

	}

	static async send(eventName: string, eventParams?: AnyObject): Promise<void> {
		// 初始化神策配置
		await SensorsService.init();
		sensors['track'](eventName, eventParams);
	}
}

export {SensorsService, sensors};
