import BPConnect from "../BPConnect.class";

type DataToFind = {[key: string | number]: string | number}

export default class FindRecords extends BPConnect { 
	dataToFind: DataToFind[]
	instance: typeof BPConnect
	catalogId: number | string
	constructor(catalogId: number | string, ...args: DataToFind[]) {
		super(...args)
		this.dataToFind = args
	}

	private async findRecord(data: DataToFind) {
		this.instance.getRecords(this.catalogId)
	}

	get records() {
		return this.dataToFind.map(data => this.findRecord(data))
	}
 }