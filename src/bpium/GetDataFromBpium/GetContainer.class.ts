import { Container, containerFieldsFromBpium } from "../types";
import GetBpium from "../Connection/GetBpium.class";

export default class GetContainer {
	containers: Array<string>
	containersData: Promise<{ values: containerFieldsFromBpium }[]>
	constructor(containers: Array<string>, voyage) {
		this.containers = containers;
		this.containersData = (async () => {
			const connection = new GetBpium();
			const containersFromBpium = await connection.records(
				108,
				{'$and': [
					{31: voyage},
					{ '$or': containers.map(c => ({ 2: c })) }
				]}
			)
			if (!containersFromBpium) return undefined;
			return containersFromBpium
		})()
	}
}