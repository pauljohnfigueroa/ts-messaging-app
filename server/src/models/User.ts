import { Schema, model, Types } from 'mongoose'

interface IUser {
	name: string
	email: string
	password: string
	avatar: string
	friends: Types.Array<Types.ObjectId>
	rooms: Types.Array<Types.ObjectId>
	activeRooms: Types.Array<Types.ObjectId>
	refreshToken: string
	isOnline: boolean
}

const userSchema = new Schema<IUser>(
	{
		name: {
			type: String,
			required: [true, 'Name is required.']
		},
		email: {
			type: String,
			required: [true, 'Email is required.']
		},
		password: {
			type: String,
			required: [true, 'Password is required.']
		},
		avatar: {
			type: String,
			default: 'default-avatar.jpg'
		},
		friends: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User'
			}
		],
		activeRooms: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Room'
			}
		],
		refreshToken: {
			type: String
		},
		isOnline: {
			type: Boolean,
			default: false
		}
	},
	{
		timestamps: true
	}
)

const User = model<IUser>('User', userSchema)
export default User
