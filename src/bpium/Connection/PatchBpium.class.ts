import Request from "./Request.class";
import { safeFile } from "../utils/safeFile";

type Item = 'record' | 'catalog'
type actions = 'new' | 'add'

export default class PatchBpium extends Request {
	data
	constructor(data?: any,headers?: any) {
		super("PATCH", data, headers);
		this.headers['Content-Type'] = 'application/json'
	}

	async record(catalogId: number | string, recordId: number | string, data = {}) {
		this.url = `${this.url}/catalogs/${catalogId}/records/${recordId}`;
		this.data = {values: data}
		safeFile('check_patch.json', JSON.stringify(this.data, null, 1))
		try {
			const res = await this.send()
			return res.data
		} catch (err) {
			console.log(err)
		}
	}
}