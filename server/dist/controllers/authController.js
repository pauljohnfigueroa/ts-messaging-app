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
exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
/* Register a User */
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, avatar } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashed = yield bcrypt_1.default.hash(password, salt);
        const newUser = new User_1.default({
            name,
            email,
            password: hashed,
            avatar
        });
        newUser.save();
        res.status(200).json(newUser);
        console.log(newUser);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `Error adding new user. ${error.message}` });
    }
});
exports.registerUser = registerUser;
/* User login */
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({ email }, { refreshToken: 0 });
        if (!user) {
            console.log('Invalid email or password');
            return res.status(400).json({ message: `Invalid email or password` });
        }
        const auth = yield bcrypt_1.default.compare(password, user.password);
        if (!auth) {
            console.log('Wrong credentials.');
            return res.status(401).json({ message: `Wrong credentials.` });
        }
        /* JWT */
        const accessToken = jsonwebtoken_1.default.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '300s'
        });
        const refreshToken = jsonwebtoken_1.default.sign({ email: user.email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '600s'
        });
        /* Save refreshToken to the database */
        const updateUser = yield User_1.default.findOneAndUpdate({ _id: user._id }, { refreshToken, isOnline: true });
        /* Best practice: Always store JWTs inside an httpOnly cookie. */
        if (updateUser) {
            /* add { secure: true } in production */
            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        }
        user.password = '';
        res.status(200).json({ user, accessToken });
    }
    catch (error) {
        res.status(500).json({ message: `Error loginUser controller. ${error.message}` });
    }
});
exports.loginUser = loginUser;
/* Logout user */
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /* Important: Do not forget to also delete the token in the client side */
    /* Check if cookies exist */
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
        return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    /* remove the refreshToken from the database */
    const user = yield User_1.default.findOneAndUpdate({ refreshToken }, { refreshToken: null, isOnline: false });
    /* Important: add { secure: true  in production */
    res.clearCookie('jwt', { httpOnly: true });
    res.sendStatus(204);
});
exports.logoutUser = logoutUser;
