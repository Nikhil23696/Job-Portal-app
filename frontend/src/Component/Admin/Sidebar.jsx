import { Typography } from '@mui/material'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import './Admin.css'

const Sidebar = () => {
    return (
        <> 
            <div className="sidebar">
                <Link to={'/admin/job/new'} className='link'>
                    <h3 className='text'>Create New Job</h3>
                </Link>
                <Link to={'/admin/applicants'} className='link'>
                    <h3 className='text'>All Applicants</h3>
                </Link>
                <Link to={'/admin/jobs/all'} className='link'>
                    <h3 className='text'>All Jobs</h3>
                </Link>
            </div>
            <Outlet />
        </>
    )
}

export default Sidebar