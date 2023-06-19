import { Request, Response } from 'express'
import Room from '../models/Room'

export const createRoom = async (req: Request, res: Response) => {
	try {
		const { name, members } = req.body

		// check the room already exist
		const existingRoom = await Room.findOne({
			members: { $all: members }
		})
		if (existingRoom) {
			return res.status(200).json(existingRoom)
		}

		// new room
		const newRoom = new Room({
			name,
			members
		})
		const savedRoom = await newRoom.save()

		res.status(200).json(savedRoom)
	} catch (error) {
		res.status(500).json({ message: error })
	}
}
