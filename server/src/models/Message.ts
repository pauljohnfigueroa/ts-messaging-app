import { Schema, model, Types } from 'mongoose'

interface IMessage {
  message: string
  to: Types.ObjectId
  from: Types.ObjectId
}

const messageSchema = new Schema<IMessage>({
  message: {
    type: String,
    required: true
  },
  to: {
    type: Schema.Types.ObjectId
  },
  from: {
    type: Schema.Types.ObjectId
  }
})

export const Message = model('Message', messageSchema)
