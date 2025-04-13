import React from 'react'
import { BsThreeDots } from 'react-icons/bs'
import './Applicant.css'
import useGetAllApplication from '../../hooks/useGetAllApplication'
import { useDispatch, useSelector } from 'react-redux'
import UpdateStatus from '../Menu/UpdateStatus'
import { setUpdateStatus } from '../../redux/serviceSlice'

const Applicant = () => {
    const dispatch = useDispatch()
    useGetAllApplication();
    const handleStatus = ()=>{
         dispatch(setUpdateStatus(true))
    }
    const {application} = useSelector((store)=> store.job)
    return (
        <>  
            <div className="applicant">
                <div className="app1">
                    <b>Full Name</b>
                    <b className='email'>Email</b>
                    <b className='email'>Contact</b>
                    <b className='email'>Resume</b>
                    <b>Action</b>
                </div>
                {
                    application && application.map((app)=>(

                <div className="app2" key={app._id}>
                    <p>{app?.applicant?.name}</p>
                    <p className='email'>{app?.applicant?.email}</p>
                    <p className='email'>{app?.applicant?.phoneNumber}</p>
                    <p className='email'>resume.pdf</p>
                    <p><BsThreeDots cursor={'pointer'} onClick={handleStatus}/></p>
                    <UpdateStatus/>
                </div>
                    ))
                }
            </div>
        </>
    )
}

export default Applicant