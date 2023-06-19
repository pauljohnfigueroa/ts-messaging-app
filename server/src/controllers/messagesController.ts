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

/* 	The getMessages function is used to fetch the message history 
	of a room from the Message collection. */
export const getMessages = async (req: Request, res: Response) => {
	try {
		const { roomId } = req.params
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
					room: '$room',
					name: '$name.name',
					message: '$message'
				}
			}
		])
		res.status(200).json(response)
	} catch (error) {
		res.status(401).json({ messages: 'Can not fetch the data.' })
	}
}
