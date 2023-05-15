import PatchBpium from "../Connection/PatchBpium.class"

export default class PatchContainer { 
	private newContainer: {id: string | number, catalogId: string | number}[]

	async updateContainer( data, recordId ) {
		const connection = new PatchBpium()
		const newContainer = await connection.record( 108, recordId, data )
		if (!newContainer) return undefined;
		return { recordId, catalogId: 108}
	}
}
