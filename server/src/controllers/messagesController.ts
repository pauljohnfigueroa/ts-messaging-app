import { Request, Response } from 'express'
import Message from '../models/Message'

export const getMessages = async (req: Request, res: Response) => {
	const { roomId } = req.params
	console.log('roomId', roomId)
	try {
		const response: any = await Message.find({ room: roomId })
		console.log(response)
		res.status(200).json(response.data)
	} catch (error) {
		res.status(401).json({ messages: 'Can not fetch the data.' })
	}
}
