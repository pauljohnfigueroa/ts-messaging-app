"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.getUser = void 0;
const getUser = (req, res) => {
    const { hello } = req.body;
    console.log('getUser controller');
    res.send('Response from the getUser controller.');
};
exports.getUser = getUser;
const getUsers = (req, res) => {
    console.log('getUsers controller');
    res.send('Response from the getUsers controller.');
};
exports.getUsers = getUsers;
