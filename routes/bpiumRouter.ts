import express from 'express'
import bodyParser from 'body-parser'

import DocsParser from '../src/bpium/DocsParser'
import CollectionReport from '../src/bpium/DocsGenerate/CollectionReport'

export const bpiumRouter = express.Router()
const jsonParser = bodyParser.json()

// bpiumRouter
// 	.route('/ifsum')
// 	.post(jsonParser, (req, res) => {
// 		new BpiumProcessRunner({
// 			moduleName: 'IfsumValidateProcess',
// 			data: req.body,
// 			async: false
// 		}).run()
// 			.then(result => {
// 				res.status(200).send(result)
// 			})
// 			.catch(err => {
// 				res.status(500).send(err)
// 			})
// 	})

bpiumRouter
	.route('/documents/export')
	.post(jsonParser, async (req, res) => {
		try {
			const result = await DocsParser(req.body)
			res.status(200).send(result)
		} catch (e) {
			res.status(500).json(e)
		}
	})

bpiumRouter
.route('/documents/getReport')
.post(jsonParser, async (req, res) => {
	if( !req.body ) res.status(400).send('Bad request')
	if( !req.body.payload ) res.status(400).send('There is no payload')
	if( !req.body.payload.catalogId ) res.status(400).send('There is no catalogId')
	if( !req.body.payload.recordId ) res.status(400).send('There is no recordId')
	try {
		const result = await new CollectionReport(req.body.payload).getCollection()
		res.status(200).send(result)
	} catch (e) {
		res.status(500).json(e)
	}
})