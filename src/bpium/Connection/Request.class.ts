import axios from "axios";
import dotenv from 'dotenv'
import path from 'path'
import { URLSearchParams } from "url";

const bpConfig = dotenv.config({ path: path.resolve(__dirname, '../../../../config/config.env') }).parsed


const {
	PROTOCOL,
	BPIUM_URL,
	API_PATH,
	USERNAME,
	PASSWORD
} = bpConfig;

const baseURL = `${PROTOCOL}://${BPIUM_URL}`;

export default class Request {
	baseURL: string;
	method: string;
	data: any;
	headers: any;
	url: string;
	cookie: string;
	connect
	constructor(method: string, data?: any, headers?: any) {
		this.baseURL = baseURL;
		this.url = API_PATH;
		this.method = method;
		this.data = data;
		this.headers = headers || {};
	}

	private async auth(email: string = USERNAME, password: string = PASSWORD) {
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
			this.cookie = res.headers['set-cookie'][0];
			Object.assign(this.headers, { cookie: this.cookie })
		} catch (e) {
			console.error(e)
		}
	}

	async send(filter?) {
		if (this.headers.cookie === undefined) { await this.auth() }
		try {
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
