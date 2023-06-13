"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const socket_io_1 = require("socket.io");
/* Route handlers */
const authRoute_js_1 = __importDefault(require("./routes/authRoute.js"));
const usersRoute_js_1 = __importDefault(require("./routes/usersRoute.js"));
const app = (0, express_1.default)();
dotenv_1.default.config();
/* Middleware */
/* Must be placed before the route handlers */
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
/* Required by req.body, works in tandem with express.json() */
app.use(body_parser_1.default.json({ limit: '30mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '30mb', extended: true }));
app.use('/', authRoute_js_1.default);
app.use('/users', usersRoute_js_1.default);
/* Database server */
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
