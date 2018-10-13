"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const socketIO = require("socket.io");
const http_1 = require("http");
const color_1 = require("./utils/color");
const api_1 = require("./api");
const host = 'localhost';
const port = 4000;
const app = express();
const server = http_1.createServer(app);
const sIO = socketIO(server, {
    path: '/test'
});
const apiRouter = api_1.default(sIO);
sIO.on('connection', socket => console.log(socket.id));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/api', apiRouter);
// Ignore the host value error
// @ts-ignore
server.listen(port, host, () => {
    console.log(color_1.color(`\nStarted on ${host}:${port}\n`, 'fg.black', 'bg.green'));
});
//# sourceMappingURL=index.js.map