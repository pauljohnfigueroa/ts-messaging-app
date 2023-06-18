import { Request, Response } from 'express'
import Room from '../models/Room'

export const createRoom = async (req: Request, res: Response) => {
	try {
		const { name, members, isPrivate } = req.body
		const exist = await Room.findOne({
			members: { $all: members }
		})
		if (exist) {
			console.log('Room exist.')
			return res.status(500).json('Room exist.')
		}
		// check if the room exist
		const newRoom = new Room({
			name,
			members,
			isPrivate
		})
		const savedRoom = await newRoom.save()

		res.status(200).json(savedRoom)
	} catch (error) {
		res.status(500).json({ message: error })
	}
}
