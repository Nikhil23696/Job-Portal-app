import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter Name']
    },
    email: {
        type: String,
        required: [true, 'Please enter Email']
    },
    password: {
        type: String,
        required: [true, 'Please enter Password'],
        select: false
    }, 
    phoneNumber: {
        type: Number,
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    resume: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    },
    role: {
        type: String,
        default:"student"
    },
    bio: {
        type: String
    },
    skill: {
        type: String
    },
    createdAt: { type: Date, default: Date.now },
})
export const User = mongoose.model("User", userSchema)