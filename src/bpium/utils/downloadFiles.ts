import Fs from 'fs'
import Axios from 'axios'

import Path from 'path'
import createCatalogs  from '../utils'

type File = {
	id: number
	docType: string
	title: string
	size: number
	url: string
	mimeType: string
	metadata: string | null
	fileName?: string
}

export default async function downloadFiles(file: File) {
	console.log('file', file)
	const url = file.url;
	const encodedURL = encodeURI(url)
	const writer = Fs.createWriteStream(file.fileName);
	console.log( `Download file from: ${url}`)
	console.log( `Save file to: ${file.fileName}`)
	const resp = await Axios({ url, method: 'GET', responseType: 'stream' })

	resp.data.pipe(writer)

	return new Promise((res, rej) => {
		writer.on('finish', res)
		writer.on('error', rej)
	})

};
