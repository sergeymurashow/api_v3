import Request from "./Request.class";
import { safeFile } from "../utils/safeFile";

type Item = 'record' | 'catalog'
type actions = 'new' | 'add'

export default class PostBpium extends Request {
	data
	constructor(data?: any, headers?: any) {
		super("POST", data, headers);
		this.headers['Content-Type'] = 'application/json'
	}

	async record(catalogId: number | string, data = {}) {
		this.url = `${this.url}/catalogs/${catalogId}/records`;
		this.data = {values: data}
		safeFile('check_post.json', JSON.stringify(this.data, null, 1))
		try {
			const res = await this.send()
			return res.data
		} catch (err) {
			console.log(err)
		}
	}
}