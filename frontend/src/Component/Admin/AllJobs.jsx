import React from 'react'
import './CreateJob.css'
import { useDispatch, useSelector } from 'react-redux'
import { MdOutlineDelete, MdModeEdit  } from "react-icons/md";
import { toast } from 'react-toastify'
import axios from 'axios'
import { removeJob } from '../../redux/jobSlice.js'
import UpdateJob from '../Menu/UpdateJob.jsx';
import { setUpdateJob } from '../../redux/serviceSlice.js';

const AllJobs = () => {
    const { allJobs } = useSelector((store) => store.job);
    const dispatch = useDispatch()

    const handleDeleteJob = async(id)=>{
     try {
        const res = await axios.delete(`https://kaamkarlo.onrender.com/api/v1/job/delete/${id}`, {withCredentials:true});

        dispatch(removeJob(id));
        toast.success(res.data.message)

     } catch (error) {
        toast.error(error?.response?.data?.message)
     }
    }
    const handleUpdateJob = ()=>{
        dispatch(setUpdateJob(true))
    }
    return (
        <>
            <div className="create">
                <div className="creat1">
                    <b>Company</b>
                    <b>Role</b>
                    <b className='date'>Date</b>
                    <b>Action</b> 
                </div>
                {
                    allJobs && allJobs.map((job) => (
                        <div className="jobb" key={job._id}>
                            <p>{job?.company}</p>
                            <p>{job?.title}</p>
                            <p className='date'>{new Date(job?.createdAt).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}</p> 

                            <div className="jobicon">
                                <MdOutlineDelete className='mysvg' onClick={()=> handleDeleteJob(job._id)}/>
                                <MdModeEdit className='mysvg' onClick={handleUpdateJob}/>
                                <UpdateJob/>
                            </div>
                        </div>

                    ))
                }
            </div>
        </>
    )
}

export default AllJobs