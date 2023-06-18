import { Schema, model, Types } from 'mongoose'

interface IRoom {
	name: string
	description: string
	members: Types.Array<Types.ObjectId>
	// onlineMembers: Types.Array<Types.ObjectId>
	isPrivate: boolean
}

const roomSchema = new Schema<IRoom>(
	{
		name: {
			type: String,
			required: [true, 'Name is required.'],
			default: 'Private Room'
		},
		description: {
			type: String,
			default: ''
		},
		members: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User'
			}
		],
		// onlineMembers: [
		// 	{
		// 		type: Schema.Types.ObjectId,
		// 		ref: 'User'
		// 	}
		// ],
		isPrivate: {
			type: Boolean,
			default: true
		}
	},
	{
		timestamps: true
	}
)

const Room = model<IRoom>('Room', roomSchema)
export default Room
