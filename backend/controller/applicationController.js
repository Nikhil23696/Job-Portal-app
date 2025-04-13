import { Application } from '../models/applicationModel.js'
import { Job } from '../models/jobModel.js';
import { User } from '../models/userModel.js';

// apply job
export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required.",
                success: false
            })
        };
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this jobs",
                success: false
            });
        }
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }
        const newApplication = await Application.create({
            job: job,
            applicant: user
        })
        res.status(201).json({
            message: "Job applied successfully.",
            success: true,
            newApplication
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}
// get all job application - recruiter
export const getAllJobApplication = async (req, res) => {
    try {
        const application = await Application.find()
        .populate({
            path: "applicant",
            select: "name email phoneNumber resume"
        })
        res.status(200).json({
            success: true,
            application
        })
    } catch (error) {
        console.log(error)
    }
}
// get applied jobs - user
export const getAppliedJob = async (req, res) => {
    try {
        const userId = req.id;
        
        const application = await Application.find({ applicant: userId })
        .populate({
            path: "job",
            select: "company title location status "
        })
        if (!application) {
            return res.status(404).json({
                message: "No Applications",
                success: false
            })
        }
        return res.status(200).json({
            application,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}
// update status -recruiter
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;
        if (!status) {
            return res.status(400).json({
                message: 'status is required',
                success: false
            })
        };
        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({
                message: "Application not found.",
                success: false
            })
        };
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message:"Status updated successfully.",
            success:true
        });
    } catch (error) {
        console.log(error)
    }

}