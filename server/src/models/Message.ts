import { Schema, model, Types } from 'mongoose'

interface IMessage {
	message: string
	room: Types.ObjectId
	sender: Types.ObjectId
	fileType: string
}

const messageSchema = new Schema<IMessage>(
	{
		message: {
			type: String,
			required: [true, 'Message is required.']
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
		},
		fileType: {
			type: String
		}
	},
	{
		timestamps: true
	}
)

const Message = model<IMessage>('Message', messageSchema)
export default Message
