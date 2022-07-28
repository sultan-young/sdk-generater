import {SensorsService} from './service/sensors.service';
import {AliyunService} from "./service/aliyun.service";
import {AnyObject} from './type/params.type';
import {SdkConfig} from "./config";

class TrackService {

	// 复写config
	public static init = SdkConfig.init;

	/**
	 * 发送神策埋点
	 * @param trackName 事件名称
	 * @param options 参数
	 */
	static sensorsTrack = SensorsService.send;
	static aliyunTrack = SensorsService.send;

	/**
	 * 阿里云和神策埋点一起的
	 */
	static async track(eventName: string, eventParams: AnyObject): Promise<void> {
		SensorsService.send(eventName, eventParams);
		AliyunService.send(eventName, eventParams);
	}
}

SdkConfig.init();
(window as any).TrackService = TrackService;
export {TrackService};
