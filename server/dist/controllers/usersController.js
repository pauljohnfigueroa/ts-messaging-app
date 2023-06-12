"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.getUser = void 0;
/* Get one a User */
const getUser = (req, res) => {
    const { userId } = req.params;
    try {
        res.status(200).json({ message: `Response from the getUser controller to userId: ${userId}` });
        console.log('getUser controller');
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `Error getUser controller. ${error.message}` });
    }
};
exports.getUser = getUser;
/* Get multiple Users */
const getUsers = (req, res) => {
    try {
        res.status(200).json({ message: `Response from the getUsers controller.` });
        console.log('getUsers controller');
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `Error getUsers controller. ${error.message}` });
    }
};
exports.getUsers = getUsers;
