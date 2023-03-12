import express from 'express'
import bodyParser from 'body-parser'

import { BpiumProcessRunner } from '../process/bpium'

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
		const BPR = new BpiumProcessRunner({
			moduleName: 'DocsProcess',
			data: req.body,
			async: true
		})
		try {
			const result = await BPR.run()
			res.status(200).send(result)
		} catch (e) {
			res.status(500).json(e)
		}

	})