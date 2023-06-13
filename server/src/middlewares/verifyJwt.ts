import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers['authorization']
	if (!authHeader) return res.sendStatus(401)
	console.log('authHeader', authHeader)
	// get the token
	const token = authHeader.split(' ')[1]

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, decoded) => {
		if (err) {
			return res.sendStatus(403)
		}
		;(<any>req).email = (<any>decoded).email
		console.log('(<any>req).email ', (<any>req).email)
		next()
	})
}

export default verifyJwt
