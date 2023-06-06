"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
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
exports.Message = (0, mongoose_1.model)('Message', messageSchema);
