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
exports.loginUser = exports.registerUser = void 0;
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
        const result = yield User_1.default.findOne({ email });
        if (!result) {
            console.log('Invalid email or password');
            return res.status(200).json({ message: `Invalid email or password` });
        }
        const auth = yield bcrypt_1.default.compare(password, result.password);
        if (!auth) {
            console.log('Wrong credentials.');
            return res.status(200).json({ message: `Wrong credentials.` });
        }
        /* JWT */
        const accessToken = jsonwebtoken_1.default.sign({ email: result.email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '300s'
        });
        const refreshToken = jsonwebtoken_1.default.sign({ email: result.email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        result.password = '';
        console.log(result);
        /* Best practice: Always store JWTs inside an httpOnly cookie. */
        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.status(200).json({ result, accessToken });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `Error loginUser controller. ${error.message}` });
    }
});
exports.loginUser = loginUser;
