import SlsWebLogger from 'js-sls-logger';
import {getCommonParams} from '../utils/getCommonParams.util';
import sensors from '../libs/sensorsdata.lib';
import {pvId} from '../utils/getUnique.util';
import {AnyObject} from "../type/params.type";
import { SdkConfig } from '../config';

class AliyunService {

	static logger: SlsWebLogger | undefined;

	static send(eventName: string, eventParams: AnyObject): void {
		const {product_id, host} = SdkConfig.config;
		const sa_distinct_id: string = sensors.store.getDistinctId() || pvId;
		eventParams['event_name'] = eventName;
		const {HOST, PROJECT, LOG_STORE} = host;

		if (!AliyunService.logger) {
			AliyunService.logger = new SlsWebLogger({host: HOST, project: PROJECT, logstore: LOG_STORE});
		}

		AliyunService.logger.send({
			...eventParams,
			...getCommonParams({
				sa_distinct_id,
				product_id,
				country_name: host.COUNTRY_NAME
			})
		});

	}
}

export {AliyunService};
