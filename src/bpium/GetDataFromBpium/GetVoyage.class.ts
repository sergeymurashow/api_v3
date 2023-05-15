import GetBpium from "../Connection/GetBpium.class";

export default class GetVoyage {
	voyageNumber: string;
	voyage: Promise<{ id: number | string, catalogId: number | string  }[]>;
	constructor(voyageNumber: string) {
		this.voyageNumber = voyageNumber;
		this.voyage = (async (): Promise<{ id: number | string, catalogId: number | string  }[]> => {
			const connection = new GetBpium();
			const voyage = await connection.records(
				139,
				{ 4: voyageNumber }
			)
			if (!voyage) return undefined;
			return voyage.map( v => Object.assign( v, { catalogId: "139" } ) )
		})()
	}
}