import { Schema, model } from "mongoose"


const userSchema = new Schema(
    {
        name: String,
        email: String,
        password: String,
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        },
        otp: String,
        otpExpires: Date,
        otpVerified: {
          type: Boolean,
          default: false,
        }
    },
    {
        versionKey: false,
        timestamps: { updatedAt: false }
    }
)

export const User = model('User', userSchema)
