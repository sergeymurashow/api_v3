import axios from "axios";
import bpiumConfig from "../../../GetConfig";

const {
	protocol,
	bpiumUrl,
	apiPath,
	login,
	pass,
} = bpiumConfig

const baseURL = `${protocol}://${bpiumUrl}`;

let requestCount: number = 0;
let stopAfter: number = 1999;
let cookie: string;

class ConnectionController {
	  constructor() {

  }

  private async auth(email: string = login, password: string = pass) {
	if( requestCount >= stopAfter ) {
		await new Promise(resolve => setTimeout(resolve, 1000 * 30));
		requestCount = 0;
	}
		try {
			const res = await axios({
				baseURL,
				url: 'auth/login',
				method: 'POST',
				data: {
					email,
					password
				}
			});
			cookie = res.headers['set-cookie'][0];
			requestCount++;
		} catch (e) {
			console.error(e)
		}
	}

	async request(input: {url: string, method: string, data?: any, headers?: any, filter?}) {

		const { url, method, data, headers, filter } = input;

		if (typeof cookie === 'undefined') { await this.auth() }
		try {
			if( requestCount >= stopAfter ) {
				await new Promise(resolve => setTimeout(resolve, 1000 * 61));
				requestCount = 0;
			}
			++requestCount;
			return await axios({
				baseURL: baseURL,
				url: `${apiPath}/${url}`,
				method: method,
				data: data,
				headers: Object.assign(headers, { cookie: cookie }),
				params: filter,
			});
		} catch (e) {
			console.error(e)
		}
	}
}

export const controller = new ConnectionController()