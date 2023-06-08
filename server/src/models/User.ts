import { Schema, model, Types } from 'mongoose'

interface IUser {
  name: string
  email: string
  password: string
  avatar: string
  activeRooms: Types.Array<Types.ObjectId>
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String
    },
    activeRooms: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Room'
      }
    ]
  },
  {
    timestamps: true
  }
)

const User = model<IUser>('User', userSchema)
export default User
