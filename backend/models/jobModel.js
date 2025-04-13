import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    requirement:{
        type: String
    },
    salary:{
        type: String,
        required: true
    },
    positions:{
        type: Number,
        required: true
    },
    jobType:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    experience:{
        type: String,
        required: true
    },
    company:{
        type: String,
        required: true
    },
    application:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application',
        }
    ],
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt:{
        type:Date,
        default: Date.now
    }

});
export const Job = mongoose.model("Job", jobSchema)