"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    message: {
        type: String,
        required: [true, 'Message is required.']
    },
    room: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'Room id is required.'],
        ref: 'Room'
    },
    sender: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'Sender is required.'],
        ref: 'User'
    },
    fileType: {
        type: String
    }
}, {
    timestamps: true
});
const Message = (0, mongoose_1.model)('Message', messageSchema);
exports.default = Message;
