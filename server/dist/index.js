"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const usersRoute_js_1 = __importDefault(require("./routes/usersRoute.js"));
app.get('/', (req, res) => {
    console.log('Welcome to Express.'); // logged in the node console
    res.send('Mabuhay to EXPRESS JS.'); // appears in the frontend
});
app.use('/users', usersRoute_js_1.default);
/* Express server */
const PORT = 8000;
exports.server = app.listen(PORT, () => {
    console.log(`SUCCESS - The server is listening on PORT ${PORT}`);
});
/* Socket.io */
const io = new socket_io_1.Server(exports.server, {
    pingTimeout: 60,
    cors: {
        origin: '*',
        methods: ['get', 'post']
    }
});
io.on('connection', socket => {
    console.log('Socket IO - connection');
    /* Disconnected */
    socket.on('disconnect', () => {
        console.log('Socket IO - disconnected.');
    });
});
