"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessages = void 0;
const getMessages = (req, res) => {
    console.log('getMessages');
    res.status(200).json({ messages: 'The messages' });
};
exports.getMessages = getMessages;
