import * as path from 'path'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as socketIO from 'socket.io'
import { createServer } from 'http'
import { color } from './utils/color'
import api from './api'
import axios from 'axios'

const host = 'localhost'
const port = 4000

const app = express()
const server = createServer(app)
const sIO = socketIO(server, {
  path: '/test'
})
const apiRouter = api(sIO)

sIO.on('connection', socket => console.log(socket.id))

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/', express.static(path.join(__dirname, '../public')))
app.use('/api', apiRouter)

// Ignore the host value error
// @ts-ignore
server.listen(port, host, () => {
  console.log(color(`\nStarted on ${host}:${port}\n`, 'fg.black', 'bg.green'))
})
