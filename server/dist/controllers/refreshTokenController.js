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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const refreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    /* Check if cookies exist */
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
        return res.sendStatus(401);
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;
    /* Get the refreshToken from the database. */
    const user = yield User_1.default.findOne({ refreshToken });
    if (!user)
        return res.sendStatus(403);
    /* Verify the refresh token */
    jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err || user.email !== decoded.email) {
            return res.sendStatus(403);
        }
        /* Generate a new accessToken */
        const accessToken = jsonwebtoken_1.default.sign({ email: decoded.email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '60s'
        });
        /* Send the new accessToken */
        res.status(200).json({ accessToken });
    });
});
exports.default = refreshToken;
