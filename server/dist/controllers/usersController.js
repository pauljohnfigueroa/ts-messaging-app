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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.getUser = exports.loginUser = exports.registerUser = void 0;
/* Register a User */
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //const { name, email, password, password2, avatar } = req.body
    try {
        res.status(200).json({ message: `Response from the registerUser controller.` });
        console.log('registerUser controller');
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `Error registerUser controller. ${error.message}` });
    }
});
exports.registerUser = registerUser;
/* User login */
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({ message: `Response from the loginUser controller.` });
        console.log('loginUser controller');
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `Error loginUser controller. ${error.message}` });
    }
});
exports.loginUser = loginUser;
/* Get one a User */
const getUser = (req, res) => {
    const { userId } = req.params;
    try {
        res.status(200).json({ message: `Response from the getUser controller to userId: ${userId}` });
        console.log('getUser controller');
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `Error getUser controller. ${error.message}` });
    }
};
exports.getUser = getUser;
/* Get multiple Users */
const getUsers = (req, res) => {
    try {
        res.status(200).json({ message: `Response from the getUsers controller.` });
        console.log('getUsers controller');
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `Error getUsers controller. ${error.message}` });
    }
};
exports.getUsers = getUsers;
