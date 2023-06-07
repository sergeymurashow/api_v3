import PostBpium from "../Connection/PostBpium.class"

export default class PostClient { 
	newClient: {id: string | number, catalogId: string | number}[]

	async addClient( client ): Promise<any> {
		const connection = new PostBpium()
		const newClient = await connection.record( 111, client)
		if (!newClient) return undefined;
		return  {recordId: newClient.id , catalogId: 111}
	}
}
