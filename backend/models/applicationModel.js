import mongoose from "mongoose";
import { Job } from "./jobModel.js";
import { User } from "./userModel.js";

const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    }, 
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },

})
export const Application = mongoose.model("Application", applicationSchema)