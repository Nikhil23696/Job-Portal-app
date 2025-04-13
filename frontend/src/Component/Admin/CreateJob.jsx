import React, { useState } from 'react'
import './CreateJob.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material'

const CreateJob = () => {

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

    const jobFormHandler = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const res = await axios.post('http://localhost:8080/api/v1/job/new',
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
            console.log(res.data.job)
            if (res.data.success) {
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
        setLoading(false)
    }


    return (
        <>
            <div className="neww">
                <h2 className='h2'>Create New Job</h2>
                <form className='jobcreate' onSubmit={jobFormHandler}>
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
            </div>

        </>
    )
}

export default CreateJob