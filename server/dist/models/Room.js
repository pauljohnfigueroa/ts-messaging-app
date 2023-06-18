"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const roomSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Name is required.'],
        default: 'Private Room'
    },
    description: {
        type: String,
        default: ''
    },
    members: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    // onlineMembers: [
    // 	{
    // 		type: Schema.Types.ObjectId,
    // 		ref: 'User'
    // 	}
    // ],
    isPrivate: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});
const Room = (0, mongoose_1.model)('Room', roomSchema);
exports.default = Room;
