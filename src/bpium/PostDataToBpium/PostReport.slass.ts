import PostBpium from "../Connection/PostBpium.class"

export default class PostContract { 
	newPoint: {id: string | number, catalogId: string | number}[]

	async addContract( contractNumber: string ): Promise<any> {
		const connection = new PostBpium()
		const newContract = await connection.record( 114, {
			2: contractNumber,
			12: ['1']
		})
		if (!newContract) return undefined;
		return Object.assign(newContract, {catalogId: 114})
	}
}
