import { Schema, model } from "mongoose"


const messageSchema = new Schema(
    {
        message: String,
        resrver_id: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        versionKey: false,
        timestamps: { updatedAt: false }
    }
)

export const Message = model('Message', messageSchema)
