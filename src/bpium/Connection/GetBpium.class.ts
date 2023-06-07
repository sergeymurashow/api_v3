import Request from "./Request.class";
import SetFilter, { filterParams } from "./SetFilter.class";

type Item = 'record' | 'catalog'
type actions = 'new' | 'add'

export default class GetBpium extends Request {
	searchParams: SetFilter;
	constructor(headers?: any, data?: any) {
		super("GET", data, headers);
		this.searchParams = new SetFilter();
	}

	catalog(catalogId: number | string) {
		this.url = `catalogs/${catalogId}`;
		return this.send()
			.then(res => res.data)
			.catch(err => console.log(err))
	}

	record(catalogId: number | string, recordId: number | string) {
		this.url = `catalogs/${catalogId}/records/${recordId}`;
		return this.send()
			.then(res => res.data)
			.catch(err => console.log(err))
	}

	/**
	 * @param catalogId
	 * @param filter Can be on two types:
	 * 1. { fieldId: value }
	 * 2. { 'or': [ { fieldId: value_1 }, { fieldId: value_2 },
	 * 	{ 'and': [ { fieldId: value_1 }, { fieldId: value_2 } ] } ], ... }
	 */
	records(catalogId: number | string, filter: filterParams = undefined) {
		if (!!filter) {
			this.setFilter('new', filter)
		}

		this.url = `catalogs/${catalogId}/records`;
		return this.send(this.searchParams.filter)
			.then(res => res.data)
			.catch(err => console.log(err))
	}

	setFilter(action: actions, filter: filterParams) {
		switch (action) {
			case 'new': this.searchParams = new SetFilter();
				this.searchParams.filter = filter;
				break;
			case 'add': this.searchParams.filter = filter;
				break;
		}

	}
}

