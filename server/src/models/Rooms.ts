import { Schema, model, Types } from 'mongoose'

interface IRoom {
  name: string
  description: string
  members: Types.Array<Types.ObjectId>
  onlineMembers: Types.Array<Types.ObjectId>
  isPublic: boolean
}

const roomSchema = new Schema<IRoom>(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    members: {
      type: [],
      ref: 'User'
    },
    onlineMembers: {
      type: [],
      ref: 'User'
    },
    isPublic: {
      type: Boolean,
      required: true
    }
  },
  {
    timestamps: true
  }
)

export const Room = model('Room', roomSchema)
