import axios from "axios";
import dotenv from 'dotenv'
import path from 'path'
import { URLSearchParams } from "url";
import bpiumConfig from "../../../GetConfig";

// const bpConfig = dotenv.config({ path: path.resolve(__dirname, '../../../../config/config.env') }).parsed


// const {
// 	PROTOCOL,
// 	BPIUM_URL,
// 	API_PATH,
// 	USERNAME,
// 	PASSWORD
// } = bpConfig;

const {
		protocol,
		bpiumUrl,
		apiPath,
		login,
		pass,
	} = bpiumConfig

const baseURL = `${protocol}://${bpiumUrl}`;

let cookie: string;

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

	constructor(method: string, data?: any, headers?: any) {
		this.baseURL = baseURL;
		this.url = apiPath;
		this.method = method;
		this.data = data;
		this.headers = headers || {};
		this.stopAfter = 100;
	}

	private async auth(email: string = login, password: string = pass) {
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
			Object.assign(this.headers, { cookie: cookie })
			this.requestCount++;
		} catch (e) {
			console.error(e)
		}
	}

	async send(filter?) {

		if (typeof cookie === 'undefined') { await this.auth() }
		try {

			if (this.requestCount > this.stopAfter) {
				await new Promise(resolve => setTimeout(resolve, 1000 * 30));
				this.requestCount = 0;
			}

			++this.requestCount;
			return await axios({
				baseURL: this.baseURL,
				url: this.url,
				method: this.method,
				data: this.data,
				headers: this.headers,
				params: filter,
			});
		} catch (e) {
			console.error(e)
		}
	}
}
