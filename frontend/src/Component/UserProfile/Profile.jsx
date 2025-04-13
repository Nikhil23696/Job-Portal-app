import React from 'react'
import './Profile.css'
import { Avatar } from '@mui/material'
import { FaRegEdit } from "react-icons/fa";
import AppliedJob from '../ApplyJob/AppliedJob';
import UpdateProfile from '../Menu/UpdateProfile';
import { useDispatch, useSelector } from 'react-redux';
import { setUpdateMyProfile } from '../../redux/serviceSlice';

const Profile = () => {
    const dispatch = useDispatch()

    const handleUpdateProfile = ()=>{
        dispatch(setUpdateMyProfile(true))
    }
    const {authUser} = useSelector((store)=> store.user)
    return (
        <>
            <div className="prof">
                <div className="prof1">
                    <div className="prof3">
                        <Avatar src={authUser?.avatar?.url}/>
                        <div className="userde">
                            <h4>{authUser?.name}</h4>
                            <p>{authUser?.bio}</p>
                        </div>
                        <FaRegEdit className='edit' size={'1.5vmax'} onClick={handleUpdateProfile}/>
                          <UpdateProfile/>
                    </div>
                    <div className="contact">
                        <div className="contact1">
                            <b>Email:</b>
                            <p>{authUser?.email}</p>
                        </div>
                        <div className="contact1">
                            <b className='pb'>Phone:</b>
                            <p className='pb'>{authUser?.phoneNumber}</p>
                        </div>
                    </div>
                    <h3 className='hh'>Skill</h3>
                    <div className="skill">
                        <p>React</p> 
                        <p>NodeJS</p>
                        <p>MongoDB</p>
                        <p>Express</p>
                    </div>
                    <h3 className='hh'>Resume</h3>
                    <p className='pres'>{authUser?.resume?.url}</p>
                    <div className="appliedjobs1">
                        <AppliedJob />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile