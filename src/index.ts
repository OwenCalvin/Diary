import * as path from 'path'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as socketIO from 'socket.io'
import { createServer } from 'http'
import { color } from './utils/color'
import api from './api'
import axios from 'axios'

const host = '192.168.0.206'
const port = 80

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

app.post('/', (req, res) => res.send('hello'))
app.get('/', (req, res) => res.send('hello'))

axios.get('https://graph.facebook.com/301445783301221/feed?access_token=acf1527391a2c73b58062ad1e80ce644').then((res) => {
  console.log(res.data)
}).catch(err => console.log(err))

// Ignore the host value error
// @ts-ignore
server.listen(port, host, () => {
  console.log(color(`\nStarted on ${host}:${port}\n`, 'fg.black', 'bg.green'))
})
