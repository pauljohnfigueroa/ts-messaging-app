"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    console.log('Welcome to Express.'); // logged in the node console
    res.send('Hello to EXPRESS JS.'); // appears in the frontend
});
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is listening to ${PORT}`);
});
