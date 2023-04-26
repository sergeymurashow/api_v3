import Request from "./Request.class";
import axios from "axios";
import qs from 'qs';

type Item = 'record' | 'catalog'

export default class GetBpium extends Request {
	filter: { filters: string };
	constructor(headers?: any, data?: any) {
		super("GET", data, headers);
		this.filter;
	}

	catalog(catalogId: number | string) {
		this.url = `${this.url}/catalogs/${catalogId}`;
		return this.send().then(res => res.data);
	}

	record(catalogId: number | string, recordId: number | string) {
		this.url = `${this.url}/catalogs/${catalogId}/records/${recordId}`;
		return this.send().then(res => res.data);
	}

	records(catalogId: number | string, filter: any = this.filter) {
		this.url = `${this.url}/catalogs/${catalogId}/records`;
		return this.send(filter).then(res => res.data);
	}
	/**
	 * 
	 * @param filter Can be on two types:
	 * 1. { fieldId: value }
	 * 2. { 'or': [ { fieldId: value_1 }, { fieldId: value_2 },
	 * 	{ 'and': [ { fieldId: value_1 }, { fieldId: value_2 } ] } ], ... }
	 */
	setFilter(filter: any) {
		this.filter = { filters: JSON.stringify( filter ) };
	}
}