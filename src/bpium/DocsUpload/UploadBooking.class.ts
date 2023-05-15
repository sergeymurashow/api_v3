import PostBooking from "../PostDataToBpium/PostBooking.class";
import PatchBooking from "../PatchDataToBpium/PatchBooking.class";

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
}

export default class DocsUpload {
	async post(data: InputData) {
		const post = new PostBooking()
		try {
			return await post.addBooking(clearRequest(data.data))
		} catch (e) {
			console.log(e)
		}
	}

	async patch(data: InputData) {
		const patch = new PatchBooking()
		const recordId = data.recordId
		try {
			return await patch.updateBooking(clearRequest(data.data), recordId)
		} catch (e) {
			console.log(e)
		}
	}
}