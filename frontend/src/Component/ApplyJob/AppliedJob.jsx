import React from 'react'
import './Applied.css'
import useGetAppliedJob from '../../hooks/useGetAppliedJob'
import { useSelector } from 'react-redux';

const AppliedJob = () => {
    useGetAppliedJob();
    const { allAppliedJob } = useSelector((store) => store.job)
    return (
        <>
            <div className="applied">
                <h2>Jobs Applied</h2>
                <div className="grid">
                    <b>Company</b>
                    <b>Job Title</b>
                    <b>Location</b>

                    <b>Status</b>
                </div>
                {
                    allAppliedJob && allAppliedJob.map((job) => (
                        <div className="grid" key={job._id}>
                            <p className='pp'>
                                <img src="https://cdn.iconscout.com/icon/free/png-256/free-google-logo-icon-download-in-svg-png-gif-file-formats--brands-pack-logos-icons-189824.png?f=webp&w=128" width={'30vw'} className='img' />
                                {job?.job?.company}
                            </p>
                            <p>{job?.job?.title}</p>
                            <p>{job?.job?.location}</p>

                            <p>{job?.status}</p>
                        </div>

                    ))
                }

            </div>

        </>
    )
}

export default AppliedJob