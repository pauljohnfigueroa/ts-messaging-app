"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Name is required.']
    },
    email: {
        type: String,
        required: [true, 'Email is required.']
    },
    password: {
        type: String,
        required: [true, 'Password is required.']
    },
    avatar: {
        type: String,
        default: 'default-avatar.jpg'
    },
    friends: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    activeRooms: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Room'
        }
    ],
    refreshToken: {
        type: String
    },
    isOnline: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
