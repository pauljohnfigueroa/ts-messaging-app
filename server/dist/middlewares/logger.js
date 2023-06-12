"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MyLogger = (req, res, next) => {
    console.log('My Logger was called.');
    next();
};
exports.default = MyLogger;
