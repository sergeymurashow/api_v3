import express from 'express'

import { bpiumRouter } from './routes/bpiumRouter'
import { oneCRouter } from './routes/oneCRouter'

import GetConfig from './GetConfig'

const { port } = GetConfig
const configMessage = () => {
	const arr = []
	for (let i in GetConfig) {
		arr.push(`${i}: ${GetConfig[i]}`)
	}
	return arr.join('\n')
}

const app = express()
app.use('/api/bpium', bpiumRouter)
app.use('/api/1c', oneCRouter)

const startMessage = `
API version 3.0.8
Running with params:
${configMessage()}
`

app.listen(port, () => console.log(startMessage))
