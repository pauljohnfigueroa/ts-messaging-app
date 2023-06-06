"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import { createServer } from 'http'
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
// const httpServer = createServer(app)
const usersRoute_js_1 = __importDefault(require("./routes/usersRoute.js"));
app.get('/', (req, res) => {
    console.log('Welcome to Express.'); // logged in the node console
    res.send('Mabuhay to EXPRESS JS.'); // appears in the frontend
});
app.use('/users', usersRoute_js_1.default);
const PORT = 8000;
/* Express server */
const server = app.listen(PORT, () => {
    console.log(`SUCCESS - The server is listening on PORT ${PORT}`);
});
/* Socket.io */
const io = new socket_io_1.Server(server, {
    pingTimeout: 60,
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
io.on('connection', socket => {
    console.log('Socket IO - connection');
    socket.on('disconnect', () => {
        console.log('Socket IO - disconnected.');
    });
});
// httpServer.listen(PORT, () => {
//   console.log(`SUCCESS - The server is listening on PORT ${PORT}`)
// })
