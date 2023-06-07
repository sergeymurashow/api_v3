import Request from "./Request.class";
import { saveFile } from "../utils/saveFile";

type Item = 'record' | 'catalog'
type actions = 'new' | 'add'

export default class PostBpium extends Request {
	data
	constructor(data?: any, headers?: any) {
		super("POST", data, headers);
		this.headers['Content-Type'] = 'application/json'
	}

	async record(catalogId: number | string, data = {}) {
		this.url = `catalogs/${catalogId}/records`;
		this.data = {values: data}
		try {
			const res = await this.send()
			return res.data
		} catch (err) {
			console.log(err)
		}
	}
}