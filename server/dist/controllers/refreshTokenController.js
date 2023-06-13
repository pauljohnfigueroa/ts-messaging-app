"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const refreshTokenController = (req, res, next) => {
    /* Check if cookies exist */
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
        return res.sendStatus(401);
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;
    /* Get the refreshToken from the database. */
    /* Verify the refresh token */
    /* Issue a new accessToken */
};
exports.default = refreshTokenController;
