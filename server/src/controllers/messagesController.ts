import { Request, Response } from 'express'
import mongoose from 'mongoose'
import Message from '../models/Message'

const ObjectId = mongoose.Types.ObjectId

export const createMessage = async (req: Request, res: Response) => {
	try {
		const { message, room, sender, fileType } = req.body
		// if it is a text message
		const newMessage = new Message({
			message,
			room,
			sender,
			fileType
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
					as: 'sender' // get the document that matches and name it sender
				}
			},
			{ $unwind: '$sender' }, // Deconstructs the sender from the input document
			{
				$project: {
					_id: 1,
					room: '$room',
					sender: '$sender.name', // pull the name field from the sender object
					message: '$message',
					fileType: '$fileType'
				}
			}
		])
		res.status(200).json(response)
	} catch (error) {
		res.status(401).json({ messages: 'Can not fetch the data.' })
	}
}
