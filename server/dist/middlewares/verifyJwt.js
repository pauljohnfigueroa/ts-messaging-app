"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyJwt = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader)
        return res.sendStatus(401);
    console.log('authHeader', authHeader);
    // get the token
    const token = authHeader.split(' ')[1];
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.sendStatus(403);
        }
        ;
        req.email = decoded.email;
        console.log('(<any>req).email ', req.email);
        next();
    });
};
exports.default = verifyJwt;
