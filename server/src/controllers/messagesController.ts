import { Request, Response } from 'express'
import mongoose from 'mongoose'
import Message from '../models/Message'

const ObjectId = mongoose.Types.ObjectId

export const createMessage = async (req: Request, res: Response) => {
	try {
		const { message, room, sender } = req.body
		const newMessage = new Message({
			message,
			room,
			sender
		})
		const savedMessage = await newMessage.save()

		res.status(201).json(savedMessage)
	} catch (error) {
		res.status(500).json(error)
	}
}

export const getMessages = async (req: Request, res: Response) => {
	try {
		const { roomId } = req.params
		console.log('getMessages roomId', roomId)
		// const response: any = await Message.find({ room: roomId })
		const response: any = await Message.aggregate([
			{
				$match: { room: new ObjectId(roomId) }
			},
			{
				$lookup: {
					from: 'users',
					localField: 'sender',
					foreignField: '_id',
					as: 'name'
				}
			},
			{ $unwind: '$name' },
			{
				$project: {
					_id: 1,
					userId: '$user',
					room: '$room',
					name: '$name.name',
					message: '$message'
				}
			}
		])
		//console.log(response)
		res.status(200).json(response)
	} catch (error) {
		res.status(401).json({ messages: 'Can not fetch the data.' })
	}
}
