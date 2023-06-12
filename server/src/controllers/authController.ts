import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import User from '../models/User'

/* Register a User */
export const registerUser = async (req: Request, res: Response) => {
	try {
		const { name, email, password, password2, avatar } = req.body

		const salt = await bcrypt.genSalt(10)
		const hashed = await bcrypt.hash(password, salt)

		const newUser = new User({
			name,
			email,
			password: hashed,
			avatar
		})
		newUser.save()

		res.status(200).json(newUser)
		console.log(newUser)
	} catch (error: any) {
		console.log(error)
		res.status(500).json({ message: `Error registerUser controller. ${error.message}` })
	}
}

/* User login */
export const loginUser = async (req: Request, res: Response) => {
	try {
		res.status(200).json({ message: `Response from the loginUser controller.` })
		console.log('loginUser controller')
	} catch (error: any) {
		console.log(error)
		res.status(500).json({ message: `Error loginUser controller. ${error.message}` })
	}
}
