import PostBpium from "../Connection/PostBpium.class"

export default class PostContract { 
	newContract: {id: string | number, catalogId: string | number}[]

	async addContract( contract ): Promise<any> {
		const connection = new PostBpium()
		const newContract = await connection.record( 114, contract)
		if (!newContract) return undefined;
		return  {recordId: newContract.id , catalogId: 114}
	}
}
