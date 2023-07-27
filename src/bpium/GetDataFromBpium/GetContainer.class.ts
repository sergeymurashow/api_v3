import { Container, containerFieldsFromBpium } from "../types";
import GetBpium from "../Connection/GetBpium.class";

export default class GetContainer {
	containers: Array<string> | string
	containersData: Promise<{ values: containerFieldsFromBpium }[]>
	constructor(containers: Array<string> | string, voyage: { catalogId, recordId }[]) {

		let fieldContainer: string;
		let fieldVoyage: string;
		let request: { '$and': any[] }
		if (typeof containers !== 'string') {
			fieldContainer = '2'
			fieldVoyage = '31'
			request = {
				'$and': [
					{ [fieldVoyage]: voyage },
					{ '$or': containers.map(c => ({ [fieldContainer]: c })) }
				]
			}
		} else {
			fieldVoyage = '31'
			request = { '$and': [{ [fieldVoyage]: voyage }] }
		}
		this.containers = containers;
		this.containersData = (async () => {
			const connection = new GetBpium();
			const containersFromBpium = await connection.records(
				108,
				request
			)
			if (!containersFromBpium) return undefined;
			return containersFromBpium
		})()
	}
}

// let t = new GetContainer('', [{recordId: '99', catalogId: '139'}]).containersData
// 	.then(containers => {
// 		console.log(containers)
// 	}
// 	)