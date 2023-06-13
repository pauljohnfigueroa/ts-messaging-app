"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersController_1 = require("../controllers/usersController");
const verifyJwt_1 = __importDefault(require("../middlewares/verifyJwt"));
const router = express_1.default.Router();
router.get('/', verifyJwt_1.default, usersController_1.getUsers);
router.get('/:userId', usersController_1.getUser);
exports.default = router;
