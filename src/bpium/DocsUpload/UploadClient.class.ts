import PostClient from "../PostDataToBpium/PostClient.class";

import clearRequest from "../utils/clearRequest.function";

type DataTemplate = {
	[key: number | string]: any
}

type InputData = {
	data: DataTemplate
	method: 'post' | 'patch'
	recordId?: string | number
}

export default class DocsUpload {
	client
	constructor(client) {
		this.client = client
	}
	async post(data: InputData = this.client) {
		const post = new PostClient()
		try {
			const newClient = await post.addClient(clearRequest(data.data))
			return [newClient]
		} catch (e) {
			console.log(e)
		}
	}

	async patch(data: InputData) {
		throw new Error('Method not implemented.');
	}
}
