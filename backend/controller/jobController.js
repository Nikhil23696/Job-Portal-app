import { Job } from "../models/jobModel.js";


// create job
export const createJob = async(req,res)=>{
    try {
         const {
            title,
            description,
            requirement,
            salary,
            positions,
            jobType,
            location,
            experience,
            company,

         } = req.body;
         const userId = req.id
         if(!title || !description || !requirement || !salary || !positions || !jobType || !location || !experience || !company){
            return res.status(404).json({
                success:false,
                message: 'Something is Missing'
            })
         }
         const job = await Job.create({
            title,
            description,
            requirement, 
            salary,
            positions,
            jobType,
            location,
            experience,
            company,
            created_by: userId
         });
         res.status(201).json({
            success:true,
            message: 'Job created successfully',
            job
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
// get all jobs
export const getAllJobs = async(req,res)=>{
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const job = await Job.find(query);
        res.status(200).json({
            success:true,
            job
        })
    } catch (error) {
       console.log(error) 
    }
}
// update job
export const updateJob = async(req,res)=>{
    try {
       const jobData = {
        title: req.body.title,
        description: req.body.description,
        requirement: req.body.requirement,
        salary: req.body.salary,
        position: req.body.positions,
        jobTYpe: req.body.jobType,
        location: req.body.location,
        experience: req.body.experience,
        company: req.body.company
       }
       const jobId = req.params.id;
       const job = await Job.findByIdAndUpdate(jobId, jobData, {
        new: true,
        runValidators: true
       });
       res.status(200).json({
        success: true,
        message:'Job Updated Successfully',
        job
       })

    } catch (error) {
       console.log(error) 
    }
}
// delete job
export const deleteJob = async(req,res)=>{
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                success:false,
                message: 'No Job found'
            })
        }
        await job.deleteOne();
        res.status(200).json({
            success: true,
            message: 'Job deleted Successfully'
        })
    } catch (error) {
       console.log(error) 
    }
}
// search job
export const searchJob = async(req,res)=>{
    try {
        
    } catch (error) {
       console.log(error) 
    }
}
//get job details
export const getJobDetails = async(req,res)=>{
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        res.status(200).json({
            success: true,
            job
        })
    } catch (error) {
        console.log(error)
    }
}