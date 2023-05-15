import PatchBpium from "../Connection/PatchBpium.class"

type VoyageNumber = {
	id: string | number
	catalogId: string | number
	[key: string | number]: any
}

export default class PatchBooking { 
	private newBooking: {id: string | number, catalogId: string | number}[]

	async updateBooking( data, recordId ) {
		const connection = new PatchBpium()
		const newBooking = await connection.record( 73, recordId, data )
		if (!newBooking) return undefined;
		return {recordId, catalogId: 73}
	}
}
