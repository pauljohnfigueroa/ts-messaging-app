"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
/* Middleware */
const validateUserData_1 = require("../middlewares/validateUserData");
const route = express_1.default.Router();
route.post('/register', validateUserData_1.validateUserData, authController_1.registerUser);
route.post('/login', validateUserData_1.validateUserLogin, authController_1.loginUser);
exports.default = route;
