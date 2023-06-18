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
exports.createRoom = void 0;
const Room_1 = __importDefault(require("../models/Room"));
const createRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, members } = req.body;
        //console.log(name, members)
        // check the room already exist
        const existingRoom = yield Room_1.default.findOne({
            members: { $all: members }
        });
        if (existingRoom) {
            //console.log('Room exist.')
            return res.status(200).json(existingRoom);
        }
        // check if the room exist
        const newRoom = new Room_1.default({
            name,
            members
        });
        const savedRoom = yield newRoom.save();
        res.status(200).json(savedRoom);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.createRoom = createRoom;
