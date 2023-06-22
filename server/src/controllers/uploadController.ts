import { Request, Response } from 'express'

export const upload = async (req: Request, res: Response) => {
	res.status(201).json({ file: req.file })
}
