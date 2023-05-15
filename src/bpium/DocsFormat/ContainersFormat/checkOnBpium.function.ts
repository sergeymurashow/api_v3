import { Container, containerFieldFromBpium, recordValues } from "../../types";
import GetContainer from "../../GetDataFromBpium/GetContainer.class";

export default async function checkOnBpium (containers: Container[], voyage) {
	const resp = await new GetContainer(containers.map(m => m.number), voyage).containersData
	return {
		containersFromBpium: resp, 
		find(containerNumber: string): recordValues | undefined {
			return this.containersFromBpium.find(c => c.values[2] === containerNumber) || undefined
		}
	}
}