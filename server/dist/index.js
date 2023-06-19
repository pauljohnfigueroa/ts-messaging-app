"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const socket_io_1 = require("socket.io");
// import corsOptions from './config/corsOptions.js'
/* Route handlers */
const authRoute_js_1 = __importDefault(require("./routes/authRoute.js"));
const usersRoute_js_1 = __importDefault(require("./routes/usersRoute.js"));
const refreshTokenRoute_js_1 = __importDefault(require("./routes/refreshTokenRoute.js"));
const messageRoute_js_1 = __importDefault(require("./routes/messageRoute.js"));
const roomRoutes_js_1 = __importDefault(require("./routes/roomRoutes.js"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const corsOptions = {
    origin: ['http://localhost:3000'],
    credentials: true,
    optionsSuccessStatus: 200
};
/* Middleware */
/* Cross-Origin */
app.use((0, cors_1.default)(corsOptions));
/* Must be placed before the route handlers */
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
/* Required by req.body, works in tandem with express.json() */
app.use(body_parser_1.default.json({ limit: '30mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '30mb', extended: true }));
app.use('/', authRoute_js_1.default);
app.use('/users', usersRoute_js_1.default);
app.use('/refresh', refreshTokenRoute_js_1.default);
app.use('/messages', messageRoute_js_1.default);
app.use('/rooms', roomRoutes_js_1.default);
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
        origin: 'http://localhost:3000',
        methods: ['get', 'post']
    }
});
/* Socket.io Middleware */
/* Data from the front-end sent via io { query: { userId: _id } } option */
io.use((socket, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        socket.accessToken = socket.handshake.query.accessToken;
        socket.userId = socket.handshake.query.userId;
        socket.userName = socket.handshake.query.userName;
        if (!socket.accessToken || !socket.userId) {
            return next(new Error('Unauthorized'));
        }
        next(); // do not forget to call next()
    }
    catch (error) {
        next(new Error(error));
    }
}));
/*  Socket.io on connection */
io.on('connection', (socket) => {
    console.log(`Socket IO - connection - ${socket.id}`);
    /* on disconnect */
    socket.on('disconnect', () => {
        console.log('Socket IO - disconnected.');
    });
    /* A user connects */
    socket.on('user-connects', (err, message) => {
        console.log('user-connects socket.id', socket.userId);
    });
    /* A user logs in */
    socket.on('user-logs-in', (userId) => {
        console.log('user-logs-in userId', userId);
        socket.broadcast.emit('user-logged-in', userId);
    });
    /* A user openned private chat window in the front-end */
    socket.on('user-private-chat', (roomId) => {
        console.log('user-private-chat roomId', roomId);
        /* join a private group between the two users */
        socket.join(roomId);
    });
    /* A private message was sent. */
    socket.on('private-message-sent', ({ message, room, sender }) => {
        io.to(room).emit('private-message', {
            message,
            room,
            senderName: socket.userName
        });
    });
});
