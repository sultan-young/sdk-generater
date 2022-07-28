export type AnyObject = {
	[key: string]: string;
}

export type SensorsParamsType = {
	product_id: number;
	app_name?: '';
	city_name: string;
	country_name: string;
	system_language?: string;
	app_language?: string;
	[propName: string]: string | undefined | number;
}

export type CountryCode = 'AUS' | 'AU' | 'NZD' | 'CA' | 'USA' | 'US' | 'GB' | 'UK' | 'EUR' | 'SG' | 'KR' | 'JP' | 'CN'

export type HostItem = {
	SERVER_TRACK_URL: string;
	HOST: string;
	PROJECT: string;
	LOG_STORE: string;
	COUNTRY_NAME: string;
}
