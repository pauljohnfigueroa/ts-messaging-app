import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

export const validateUserData = (req: Request, res: Response, next: NextFunction) => {
	const userSchema = Joi.object({
		name: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().required(),
		// password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
		password2: Joi.ref('password'),
		avatar: Joi.string()
	})

	const { error } = userSchema.validate(req.body)

	if (error) {
		const msg = error.details.map(item => item.message).join(',')
		console.log(msg)
		res.status(400).json({ message: msg })
	} else {
		next()
	}
}

export const validateUserLogin = (req: Request, res: Response, next: NextFunction) => {
	const userSchema = Joi.object({
		email: Joi.string().required(),
		password: Joi.string().required()
	})

	const { error } = userSchema.validate(req.body)

	if (error) {
		const msg = error.details.map(item => item.message).join(',')
		console.log(msg)
		res.status(400).json({ message: msg })
	} else {
		next()
	}
}
