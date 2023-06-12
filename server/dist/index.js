"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const authRoute_js_1 = __importDefault(require("./routes/authRoute.js"));
const usersRoute_js_1 = __importDefault(require("./routes/usersRoute.js"));
app.use('/', authRoute_js_1.default);
app.use('/users', usersRoute_js_1.default);
/* Database */
mongoose_1.default
    .connect(`${process.env.MONGO_URI}`, {
// useNewUrlParser: true, // <-- no longer necessary as per docs
// useUnifiedTopology: true, // <-- no longer necessary as per docs
})
    .then(() => {
    console.log('SUCCESS - The Database connected successfully.');
})
    .catch(err => console.log(err));
/* Express server */
const PORT = process.env.PORT || 8001;
const server = app.listen(PORT, () => {
    console.log(`SUCCESS - The Server is listening on PORT ${PORT}`);
});
/* Socket.io */
const io = new socket_io_1.Server(server, {
    pingTimeout: 60,
    cors: {
        origin: '*',
        methods: ['get', 'post']
    }
});
/*  Socket.io on connection */
io.on('connection', socket => {
    console.log('Socket IO - connection');
    /* on disconnect */
    socket.on('disconnect', () => {
        console.log('Socket IO - disconnected.');
    });
});
