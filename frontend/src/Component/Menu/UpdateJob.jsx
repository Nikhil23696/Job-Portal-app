import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { setUpdateJob } from '../../redux/serviceSlice';
import { getJobDetails } from '../../redux/jobSlice';

const UpdateJob = () => {
    const {updateJob} = useSelector((store)=> store.service);
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [requirement, setRequirement] = useState("");
    const [location, setLocation] = useState("");
    const [number, setNumber] = useState("");
    const [desc, setDesc] = useState("");
    const [salary, setSalary] = useState("");
    const [job, setJob] = useState("");
    const [positions, setPositions] = useState("");
    const [company, setCompany] = useState("");
    const [loading, setLoading] = useState(false)

    const updateJobHandler = async (e, id) => {
        e.preventDefault();
        setLoading(true)
        try {
            const res = await axios.post(`https://kaamkarlo.onrender.com/api/v1/job/update/${id}`,
                {
                    title,
                    requirement,
                    location,
                    experience: number,
                    description: desc,
                    salary,
                    jobType: job,
                    positions,
                    company
                },
                {
                    headers: { 'Content-type': 'application/json' },
                    withCredentials: true
                })
            
            if (res.data.success) {
                dispatch(getJobDetails(res.data.job))
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
        setLoading(false)
    }

    const handleClose = ()=>{
       dispatch(setUpdateJob(false))
    }

    return (
        <>
            <Dialog open={updateJob} onClose={handleClose} hideBackdrop>
                <DialogTitle textAlign={'center'}>Update Job</DialogTitle>
                <DialogContent>
                    <form className='jobcreate' onSubmit={updateJobHandler}>
                        <div className="left">
                            <input
                                type="text"
                                placeholder='Title'
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder='Requirement'
                                required
                                value={requirement}
                                onChange={(e) => setRequirement(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder='Location'
                                required
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder='Experience Level'
                                required
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                            />
                        </div>
                        <div className="left">
                            <input
                                type="text"
                                placeholder='Description'
                                required
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder='Salary'
                                required
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder='Job Type'
                                required
                                value={job}
                                onChange={(e) => setJob(e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder='No. of Positions'
                                required
                                value={positions}
                                onChange={(e) => setPositions(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder='Company Name'
                                required
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                            />
                        </div>
                        <button className='btn' type='submit'>
                            {
                                loading ? (<CircularProgress color='' size={'30px'} />) : ('Create')
                            }
                        </button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default UpdateJob