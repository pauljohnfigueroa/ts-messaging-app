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
exports.getMessages = exports.createMessage = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Message_1 = __importDefault(require("../models/Message"));
const ObjectId = mongoose_1.default.Types.ObjectId;
const createMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message, room, sender } = req.body;
        const newMessage = new Message_1.default({
            message,
            room,
            sender
        });
        const savedMessage = yield newMessage.save();
        res.status(201).json(savedMessage);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.createMessage = createMessage;
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roomId } = req.params;
        console.log('getMessages roomId', roomId);
        // const response: any = await Message.find({ room: roomId })
        const response = yield Message_1.default.aggregate([
            {
                $match: { room: new ObjectId(roomId) }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'sender',
                    foreignField: '_id',
                    as: 'name'
                }
            },
            { $unwind: '$name' },
            {
                $project: {
                    _id: 1,
                    userId: '$user',
                    room: '$room',
                    name: '$name.name',
                    message: '$message'
                }
            }
        ]);
        //console.log(response)
        res.status(200).json(response);
    }
    catch (error) {
        res.status(401).json({ messages: 'Can not fetch the data.' });
    }
});
exports.getMessages = getMessages;
