import { Request, Response } from 'express'

/* Register a User */
export const registerUser = async (req: Request, res: Response) => {
  //const { name, email, password, password2, avatar } = req.body

  try {
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

/* Get one a User */
export const getUser = (req: Request, res: Response) => {
  const { userId } = req.params

  try {
    res.status(200).json({ message: `Response from the getUser controller to userId: ${userId}` })
    console.log('getUser controller')
  } catch (error: any) {
    console.log(error)
    res.status(500).json({ message: `Error getUser controller. ${error.message}` })
  }
}

/* Get multiple Users */
export const getUsers = (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: `Response from the getUsers controller.` })
    console.log('getUsers controller')
  } catch (error: any) {
    console.log(error)
    res.status(500).json({ message: `Error getUsers controller. ${error.message}` })
  }
}
