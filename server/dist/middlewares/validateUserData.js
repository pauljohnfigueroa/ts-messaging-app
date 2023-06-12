"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserLogin = exports.validateUserData = void 0;
const joi_1 = __importDefault(require("joi"));
const validateUserData = (req, res, next) => {
    const userSchema = joi_1.default.object({
        name: joi_1.default.string().required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
        // password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        password2: joi_1.default.ref('password'),
        avatar: joi_1.default.string()
    });
    const { error } = userSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(item => item.message).join(',');
        console.log(msg);
        res.status(400).json({ message: msg });
    }
    else {
        next();
    }
};
exports.validateUserData = validateUserData;
const validateUserLogin = (req, res, next) => {
    const userSchema = joi_1.default.object({
        email: joi_1.default.string().required(),
        password: joi_1.default.string().required()
    });
    const { error } = userSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(item => item.message).join(',');
        console.log(msg);
        res.status(400).json({ message: msg });
    }
    else {
        next();
    }
};
exports.validateUserLogin = validateUserLogin;
