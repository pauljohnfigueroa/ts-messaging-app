import { Schema, model, Types } from 'mongoose'

interface IMessage {
	message: string
	room: Types.ObjectId
	sender: Types.ObjectId
}

const messageSchema = new Schema<IMessage>(
	{
		message: {
			type: String,
			required: [true, 'Cannot send an empty message.']
		},
		room: {
			type: Schema.Types.ObjectId,
			required: [true, 'Room id is required.'],
			ref: 'Room'
		},
		sender: {
			type: Schema.Types.ObjectId,
			required: [true, 'Sender is required.'],
			ref: 'User'
		}
	},
	{
		timestamps: true
	}
)

const Message = model<IMessage>('Message', messageSchema)
export default Message
