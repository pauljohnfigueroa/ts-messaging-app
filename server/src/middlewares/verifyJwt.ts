import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers['authorization']
	if (!authHeader) return res.sendStatus(401)

	/* get the token from the authHeader */
	const token = authHeader.split(' ')[1]

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err: any, decoded: any) => {
		if (err) {
			return res.sendStatus(403)
		}
		;(<any>req).email = (<any>decoded).email

		next()
	})
}

export default verifyJwt
