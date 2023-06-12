import { Request, Response, NextFunction } from 'express'

const MyLogger = (req: Request, res: Response, next: NextFunction) => {
	console.log('My Logger was called.')
	next()
}

export default MyLogger
