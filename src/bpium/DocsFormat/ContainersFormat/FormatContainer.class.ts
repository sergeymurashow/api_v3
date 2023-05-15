import { Method } from "..";
import { Container, bookingFromBpium } from "../../types";
import checkOnBpium from "./checkOnBpium.function";
import getContainerButtons from "./getContainerButtons.function";

type Info = {
	voyage: Array<{ catalogId: number | string, recordId: number | string }>
	packType: string;
	applicationDate: string;
	contract?: { [key: string]: any }
}

export default class FormatContainer {
	containers: Container[];
	booking: bookingFromBpium;
	info: Info;
	constructor(containers: Container[], info: Info) {
		this.containers = containers;
		this.info = info;
	}

	async result(containers = this.containers, booking = this.booking, info = this.info) {

		const getContainers = await checkOnBpium(this.containers, this.info.voyage)

		const formattedReport = await Promise.all(containers.map(async (container, i, a) => {

			const checkContainer = getContainers.find(container.number)

			return {
				data: {
					2: container.number, // number
					3: container.tWeight, // weightTare
					4: +container.gWeight + +container.tWeight, // totalWeight
					6: info.packType, // packages
					7: container.gWeight, // grossWeight
					8: container.seal, // sealNumber
					10: container.cbm, // cbm
					11: container.packages, // qty
					15: getContainerButtons('mension', container.mension), // Container type
					17: getContainerButtons('owner', container.owner), // owner
					21: booking,
					22: info.contract,
					24: info.applicationDate,
					31: info.voyage,
					34: getContainerButtons('freightTerm', container.freight),
					40: getContainerButtons('type', container.type),
				},
				method: checkContainer ? 'patch' : 'post' as Method,
				recordId: checkContainer ? checkContainer.id : undefined
			}
		}))

		return formattedReport

	}

}