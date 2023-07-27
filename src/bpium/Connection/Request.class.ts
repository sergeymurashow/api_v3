import {controller} from "./ConnectionController.class";

export default class Request {
	baseURL: string;
	method: string;
	data: any;
	headers: any;
	url: string;
	cookie: string;
	connect
	stopAfter: number;
	requestCount: number = 0;
	nullApiPath: boolean = false;

	constructor(method: string, data?: any, headers?: any) {
		this.method = method;
		this.data = data;
		this.headers = headers || {};
		this.stopAfter = 100;
	}

	async send(filter?) {
		try {
			return await controller.request({
				baseUrl: this.baseURL,
				url: this.url,
				method: this.method,
				data: this.data,
				headers: this.headers,
				filter: filter,
				nullApiPath: this.nullApiPath,
			});
		} catch (e) {
			console.error(e)
		}
	}
}
