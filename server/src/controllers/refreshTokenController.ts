import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const refreshTokenController = (req: Request, res: Response, next: NextFunction) => {
	/* Check if cookies exist */
	const cookies = req.cookies
	if (!cookies?.jwt) return res.sendStatus(401)
	console.log(cookies.jwt)
	const refreshToken = cookies.jwt

	/* Get the refreshToken from the database. */
	/* Verify the refresh token */
	/* Issue a new accessToken */
}

export default refreshTokenController
