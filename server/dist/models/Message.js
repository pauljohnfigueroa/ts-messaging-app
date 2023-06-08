"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    message: {
        type: String,
        required: true
    },
    to: {
        type: mongoose_1.Schema.Types.ObjectId
    },
    from: {
        type: mongoose_1.Schema.Types.ObjectId
    }
}, {
    timestamps: true
});
const Message = (0, mongoose_1.model)('Message', messageSchema);
exports.default = Message;
