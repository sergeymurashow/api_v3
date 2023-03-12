import express from 'express'
import bodyParser from 'body-parser'
// import processRunner from '../src/processRunner'
import path from 'path'
import Runner from 'process/runner'

export const oneCRouter = express.Router()
const jsonParser = bodyParser.json()

oneCRouter.route('ifsum')
	.get((req, res) => {
		res.send({ response: 'It`s works!' })
	})
	.post(jsonParser, (req, res) => {
		
	})


