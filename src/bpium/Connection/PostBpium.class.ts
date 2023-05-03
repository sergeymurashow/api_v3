import Request from "./Request.class";

type Item = 'record' | 'catalog'
type actions = 'new' | 'add'

export default class PostBpium extends Request {
	data
	constructor(headers?: any) {
		super("POST", headers);
	}

	record(catalogId: number | string, data = {}) {
		this.url = `${this.url}/catalogs/${catalogId}/records`;
		this.data = {values: data}
		return this.send()
			.then(res => res.data)
			.catch(err => console.log(err))
	}

}