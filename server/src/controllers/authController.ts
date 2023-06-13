import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/User'

/* Register a User */
export const registerUser = async (req: Request, res: Response) => {
	try {
		const { name, email, password, avatar } = req.body
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
		res.status(500).json({ message: `Error adding new user. ${error.message}` })
	}
}

/* User login */
export const loginUser = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body
		const result = await User.findOne({ email })
		if (!result) {
			console.log('Invalid email or password')
			return res.status(200).json({ message: `Invalid email or password` })
		}

		const auth = await bcrypt.compare(password, result!.password)
		if (!auth) {
			console.log('Wrong credentials.')
			return res.status(200).json({ message: `Wrong credentials.` })
		}
		/* JWT */
		const accessToken = jwt.sign({ email: result.email }, process.env.ACCESS_TOKEN_SECRET!, {
			expiresIn: '60s'
		})
		const refreshToken = jwt.sign({ email: result.email }, process.env.REFRESH_TOKEN_SECRET!, {
			expiresIn: '1d'
		})

		/* Save refreshToken to the database */
		const updateUser = await User.findOneAndUpdate({ _id: result._id }, { refreshToken })
		if (updateUser) {
			/* Best practice: Always store JWTs inside an httpOnly cookie. */
			res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }) // add secure: true in production
		}

		result.password = ''

		res.status(200).json({ result, accessToken })
	} catch (error: any) {
		res.status(500).json({ message: `Error loginUser controller. ${error.message}` })
	}
}

/* Logout user */
export const logoutUser = async (req: Request, res: Response) => {
	/* Important: Do not forget to also delete the token in the client side */

	/* Check if cookies exist */
	const cookies = req.cookies
	if (!cookies?.jwt) return res.sendStatus(401)
	const refreshToken = cookies.jwt
	console.log('refreshToken', refreshToken)

	/* remove the refreshToken from the database */
	const user = await User.findOneAndUpdate({ refreshToken }, { refreshToken: null })
	/* clear the cookie */
	res.clearCookie('jwt', { httpOnly: true }) // add secure: true in production

	console.log('user', user)
	res.sendStatus(204)
}
