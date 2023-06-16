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
exports.getUsers = exports.getUser = void 0;
const User_1 = __importDefault(require("../models/User"));
/* Get one a User */
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        res.status(200).json({ message: `Response from the getUser controller to userId: ${userId}` });
        console.log('getUser controller');
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `Error getUser controller. ${error.message}` });
    }
});
exports.getUser = getUser;
/* Get multiple Users */
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find({});
        //console.log(users)
        res.status(200).json(users);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `Error getUsers controller. ${error.message}` });
    }
});
exports.getUsers = getUsers;
