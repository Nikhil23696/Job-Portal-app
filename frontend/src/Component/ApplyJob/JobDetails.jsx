import React, { useState } from 'react'
import './Apply.css'
import { CircularProgress, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import useGetJobDetails from '../../hooks/useGetJobDetails'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import axios from 'axios'
import { getMyAppliedJobs } from '../../redux/jobSlice'

const JobDetails = () => {
    const {id} = useParams();
    useGetJobDetails(id)
    const dispatch = useDispatch()
    const {jobDetails} = useSelector((store)=> store.job);
    const [loading, setLoading] = useState(false)

    const applyJobHandler = async(id)=>{
          setLoading(true);
          try {
            const res = await axios.post(`http://localhost:8080/api/v1/application/apply/${id}`, {}, {withCredentials: true});
            console.log(res.data)
            if(res.data.success){
                dispatch(getMyAppliedJobs(res.data.newApplication));
                toast.success(res.data.message)
            }
          } catch (error) {
            toast.error(error?.response?.data?.message)
          }
          setLoading(false)
    }
    return (
        <>
            <div className="apply">
                <div className="applybanner">
                    <div className="applydetail">
                        <img src="https://cdn.iconscout.com/icon/free/png-256/free-google-logo-icon-download-in-svg-png-gif-file-formats--brands-pack-logos-icons-189824.png?f=webp&w=128" width={'60vw'} height={'60vh'} />

                        <div className="head">
                            <h2>{jobDetails?.title}</h2>
                            <div className="headone">
                                <p>{jobDetails?.location}</p> 
                                <p>{jobDetails?.experience}</p>
                                <p>CTC : {jobDetails?.salary}</p>
                            </div>
                        </div>
                        <Typography className='applynow' sx={{
                            border: '1px solid rgb(177, 177, 177)',
                            padding: '0.5vmax',
                            backgroundColor: 'blue',
                            color: 'white',
                            transition: 'all 0.5s',
                            marginLeft: '50vmax',
                            ":hover": {
                                cursor: 'pointer',
                                backgroundColor: 'rgb(44, 39, 197)',
                            }
                        }} onClick={()=>applyJobHandler(jobDetails._id)}>
                            {
                                loading ? (<CircularProgress color='' size={'30px'}/>) : ('Apply Now')
                            }
                        </Typography>
                    </div>
                </div>
            </div>
            <div className="desc">
                <div className="desc1">
                    <h4>Role:</h4>
                    <p>{jobDetails?.title}</p>
                </div>
                <div className="desc1">
                    <h4>Location:</h4>
                    <p>{jobDetails?.location}</p>
                </div>
                <div className="desc1">
                    <h4>Description:</h4>
                    <p>{jobDetails?.description}</p>
                </div>
                <div className="desc1">
                    <h4>Experience:</h4>
                    <p>{jobDetails?.experience}</p>
                </div>
                <div className="desc1">
                    <h4>Salary:</h4>
                    <p>{jobDetails?.salary}</p>
                </div>
                <div className="desc1">
                    <h4>Total Application:</h4>
                    <p>{jobDetails?.application.length}</p>
                </div>
                <div className="desc1">
                    <h4>Posted Date:</h4>
                    <p>{jobDetails?.createdAt}</p>
                </div>

            </div>
        </>
    )
}

export default JobDetails