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
		const user = await User.findOne({ email }, { refreshToken: 0 })
		if (!user) {
			console.log('Invalid email or password')
			return res.status(400).json({ message: `Invalid email or password` })
		}

		const auth = await bcrypt.compare(password, user!.password)
		if (!auth) {
			console.log('Wrong credentials.')
			return res.status(401).json({ message: `Wrong credentials.` })
		}
		/* JWT */
		const accessToken = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET!, {
			expiresIn: '5m'
		})
		const refreshToken = jwt.sign({ email: user.email }, process.env.REFRESH_TOKEN_SECRET!, {
			expiresIn: '30m'
		})

		/* Save refreshToken to the database */
		const updateUser = await User.findOneAndUpdate(
			{ _id: user._id },
			{ refreshToken, isOnline: true }
		)

		/* Best practice: Always store JWTs inside an httpOnly cookie. */
		if (updateUser) {
			/* add { secure: true } in production */
			res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
		}

		user.password = ''

		res.status(200).json({ user, accessToken })
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

	/* remove the refreshToken from the database */
	const user = await User.findOneAndUpdate({ refreshToken }, { refreshToken: null })

	/* Important: add { secure: true  in production */
	res.clearCookie('jwt', { httpOnly: true })

	res.sendStatus(204)
}
