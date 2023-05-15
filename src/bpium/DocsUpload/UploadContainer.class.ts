import PostContainer from "../PostDataToBpium/PostContainer.class";
import PatchContainer from "../PatchDataToBpium/PatchContainer.class";

import check_post from '../../../check_post_t.json'
import check_patch from '../../../check_patch.json'
import clearRequest from "../utils/clearRequest.function";



type DataTemplate = {
	[key: number | string]: any
}

type InputData = {
	data: DataTemplate
	method: 'post' | 'patch'
	recordId?: string | number
	containers?: Array<any>
}

export default class DocsUpload {
	booking
	constructor( booking ) {
		this.booking = booking
	}
	async post(data: InputData) {
		const post = new PostContainer()
		Object.assign(data.data, {21: this.booking})
		try {
			return await post.addContainer(clearRequest(data.data))
		} catch (e) {
			console.log(e)
		}
	}

	async patch(data: InputData) {
		const patch = new PatchContainer()
		const recordId = data.recordId
		try {
			return await patch.updateContainer(clearRequest(data.data), recordId)
		} catch (e) {
			console.log(e)
		}
	}
}
