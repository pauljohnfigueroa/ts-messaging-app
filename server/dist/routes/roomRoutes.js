"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roomController_1 = require("../controllers/roomController");
const verifyJwt_1 = __importDefault(require("../middlewares/verifyJwt"));
const route = express_1.default.Router();
route.post('/', verifyJwt_1.default, roomController_1.createRoom);
exports.default = route;
