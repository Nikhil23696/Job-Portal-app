import React, { useState } from 'react'
import { Button, CircularProgress, Dialog, DialogContent, DialogTitle } from '@mui/material'
import './Update.css'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUpdateMyProfile } from '../../redux/serviceSlice';
import { setAuthUser } from '../../redux/userSlice'

const UpdateProfile = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [bio, setBio] = useState("");
    const [skill, setSkill] = useState("");
    const [resume, setResume] = useState("");
    const [avatar, setAvatar] = useState(false);
    const [loading, setLoading] = useState(false);

    const { updateProfile } = useSelector((store) => store.service);
    const dispatch = useDispatch()

    const updateHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try { 
            const myForm = new FormData();
            myForm.set("name", name);
            myForm.set("email", email);
            myForm.set("phoneNumber", phoneNumber);
            myForm.set("bio", bio);
            myForm.set("skill", skill);
            if (avatar) myForm.append("avatar", avatar);
            if (resume) myForm.append("resume", resume);

            const res = await axios.post('http://localhost:8080/api/v1/user/update/profile', myForm, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            })
            if (res.data.success) {
                toast.success(res.data.message);
                dispatch(setAuthUser(res.data.user))
            }
            setName("");
            setEmail("");
            setPhoneNumber("");
            setBio("");
            setSkill("");
            setResume("");
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
        setLoading(false)
    }

    const handleClose = () => {
        dispatch(setUpdateMyProfile(false))
    }
    return (
        <>
            <Dialog open={updateProfile} onClose={handleClose}>
                <DialogTitle>Update Profile</DialogTitle>
                <DialogContent>
                    <form className='form' onSubmit={updateHandler} encType='multipart/form-data'>
                        <div className="update">
                            <div className="myfiles">
                            <input
                                type="file"
                                accept='image/*'
                                hidden
                                id='avatar'
                                onChange={(e) => setAvatar(e.target.files[0])}
                            />
                            <label htmlFor="avatar">
                                <img src={avatar ? URL.createObjectURL(avatar) : "https://static-00.iconduck.com/assets.00/profile-major-icon-1024x1024-9rtgyx30.png"} width={'100vw'} />
                            </label>
                            <input
                                type="file"
                                accept='application/pdf'
                                hidden
                                id='resume'
                                onChange={(e) => setResume(e.target.files[0])}
                            />
                            <label htmlFor="resume">
                                <img src={resume ? URL.createObjectURL(resume) : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfHDXq1MKig6DpneQffG9AE3VxTsj2heGSag&s"} width={'100vw'} />
                            </label>
                            </div>
                            <input
                                type="text"
                                placeholder='Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                type="email"
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder='Phone'
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder='Bio'
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder='Skills'
                                value={skill}
                                onChange={(e) => setSkill(e.target.value)}
                            />
                            {/* <input
                                type="file"
                                accept='application/pdf'
                                placeholder='Name'
                                value={resume}
                                onChange={(e) => setResume(e.target.files[0])}
                            /> */}
                        </div>
                        <Button variant='contained' fullWidth type='submit'>
                            {
                                loading ? (<CircularProgress color='' size={'30px'} />) : ('Update')
                            }
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default UpdateProfile