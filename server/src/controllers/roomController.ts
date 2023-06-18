import { Request, Response } from 'express'
import Room from '../models/Room'

export const createRoom = async (req: Request, res: Response) => {
	try {
		const { name, members } = req.body
		//console.log(name, members)
		// check the room already exist
		const existingRoom = await Room.findOne({
			members: { $all: members }
		})
		if (existingRoom) {
			//console.log('Room exist.')
			return res.status(200).json(existingRoom)
		}
		// check if the room exist
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
