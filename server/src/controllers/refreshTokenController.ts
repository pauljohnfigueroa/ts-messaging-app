import { Request, Response, NextFunction } from 'express'

import jwt from 'jsonwebtoken'

import User from '../models/User'

const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
	/* Check if cookies exist */
	const cookies = req.cookies
	if (!cookies?.jwt) return res.sendStatus(401)
	console.log(cookies.jwt)
	const refreshToken = cookies.jwt

	/* Get the refreshToken from the database. */
	const user = await User.findOne({ refreshToken })
	if (!user) return res.sendStatus(403)

	/* Verify the refresh token */
	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (err: any, decoded: any) => {
		if (<any>err || user.email !== <any>decoded.email) {
			return res.sendStatus(403)
		}
		/* Generate a new accessToken */
		const accessToken = jwt.sign({ email: decoded.email }, process.env.ACCESS_TOKEN_SECRET!, {
			expiresIn: '10s'
		})
		/* Send the new accessToken */
		res.status(200).json({ accessToken })
	})
}

export default refreshToken
