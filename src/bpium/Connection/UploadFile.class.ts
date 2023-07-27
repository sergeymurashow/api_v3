import Request from "./Request.class";
import mime from "mime";
import fs from "fs";
import FormData from "form-data"
import { Stream } from "stream";

type Toptions = {
	catalogId: number | string,
	recordId: string | number,
	fieldId: string | number,
	name: string,
	size: number,
	mimeType: string,
	typeStorage: "remoteStorage" | "localStorage",
}

type TkeysResponse = {
	"fileId": string,
	"uploadUrl": string,
	"redirect": string,
	"acl": string,
	"fileKey": string,
	"AWSAccessKeyId": string,
	"police": string,
	"signature": string,
}

type Tkeys = {
	key: string,
	acl: string,
	AWSAccessKeyId: string,
	Policy: string,
	Signature: string,
	'Content-Type': string,
}

type TformattedKeys = { keys: Tkeys, uploadUrl: string }

type TuploadApprove = {
	"fileId": string,
	"name": string,
	"size": number,
	"mimeType": string,
	"url": string,
}

export default class UploadFile extends Request {
	filePath: string
	mime: string
	options: Toptions
	constructor(filePath: string) {
		super("POST", filePath);
		this.filePath = filePath
		this.mime = mime.getType(filePath)
		this.headers['Content-Type'] = this.mime
	}

	setOptions(catalogId: number | string, recordId: string | number, fieldId: string | number) {
		this.options = {
			catalogId,
			recordId,
			fieldId,
			name: this.filePath.split('/').pop(),
			size: fs.statSync(this.filePath).size,
			mimeType: this.mime,
			typeStorage: "remoteStorage",
		}
		return this
	}

	async upload() {
		try {
			const keys = await getKeys(this.options)
			const formattedKeys = formatKeys(keys)
			const upload = await uploadFile(formattedKeys, this.filePath)
			const approve = await uploadApprove({
				fileId: keys.fileId,
				name: this.options.name,
				size: this.options.size,
				mimeType: this.options.mimeType,
				url: keys.fileKey,
			})
			return {id: keys.fileId}
		} catch (e) {
			console.error(e) // TODO: add error handler
		}
	}
}

async function getKeys(keysOptions: Toptions): Promise<TkeysResponse> {
	try {
		const request = new Request("POST", keysOptions);
		request.url = `files`;
		const response = await request.send();

		return Object.assign(response.data, { 'Content-Type': keysOptions.mimeType });
	} catch (e) {
		console.error(e) // TODO: add error handler
	}
}

function formatKeys(keys: TkeysResponse): TformattedKeys {

	const { uploadUrl, acl, fileKey, AWSAccessKeyId, police, signature } = keys

	return {
		keys: {
			key: fileKey,
			acl,
			AWSAccessKeyId,
			Policy: police,
			Signature: signature,
			'Content-Type': keys['Content-Type'],
		},
		uploadUrl
	}
}

function makeFormData(keys: TformattedKeys['keys'], filePath: string) {
	const { key, acl, AWSAccessKeyId, Policy, Signature, 'Content-Type': ContentType } = keys
	const formData = new FormData();
	formData.append('key', key)
	formData.append('acl', acl)
	formData.append('AWSAccessKeyId', AWSAccessKeyId)
	formData.append('Policy', Policy)
	formData.append('Signature', Signature)
	formData.append('Content-Type', ContentType)
	formData.append('file', fs.createReadStream(filePath))
	return formData
}

async function uploadFile(keys: TformattedKeys, filePath: string) {

	const formData = makeFormData(keys.keys, filePath)

	const request = new Request("POST", formData);
	request.nullApiPath = true;
	request.baseURL = keys.uploadUrl;
	request.headers['Content-Type'] = 'multipart/form-data'
	return request.send();
}

async function uploadApprove(fileInfo: TuploadApprove) {

	const request = new Request("PATCH", fileInfo);
	request.url = `files/${fileInfo.fileId}`;
	return await request.send();

}

// ; (async () => {
// 	const uploadFile = new UploadFile('/Users/sergey.murashow/Codets/intecoJiangjie/api_v3/tmp/Bills of Landing I11XY_NINGBO.xlsx')
// 	const resp = await uploadFile.setOptions(139, 97, 10).upload()
// 	console.log(resp)
// })()