import { Request, Response } from 'express'

/* Register a User */
export const registerUser = async (req: Request, res: Response) => {
	try {
		const { name, email, password, password2, avatar } = req.body

		res.status(200).json({ message: `Response from the registerUser controller.` })
		console.log('registerUser controller')
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
