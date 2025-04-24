import React from 'react'
import {Avatar, Menu, MenuItem} from '@mui/material'
import './Menu.css'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getMyAccountMenu } from '../../redux/serviceSlice'
import { toast } from 'react-toastify'
import axios from 'axios'

const UserMenu = () => {
  const {accountMenu} = useSelector((store)=> store.service);
  const {authUser} = useSelector((store)=> store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
    const handleClose =()=>{
        dispatch(getMyAccountMenu(null))
    }

    const logoutHandler = async()=>{
      try {
        const res = await axios.get('https://kaamkarlo.onrender.com/api/v1/user/logout', {withCredentials: true});
        if(res.data.success){
          navigate('/login');
          toast.success(res.data.message)
        }
      } catch (error) {
        toast.error(error?.response?.data?.message)
      }
    }
  return (
    <>
    <Menu
    anchorEl={accountMenu}
    open={accountMenu !== null ? true : false}
    onClose={handleClose}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
    <MenuItem>
    <div className="profile">
        <Avatar src={authUser?.avatar?.url}/>
        <div className="userdetail">
            <h4>{authUser?.name}</h4>
            <p>{authUser?.bio}</p>
        </div>
    </div>
    </MenuItem>
    <Link className='link' to={'/profile/:id'}>
    <MenuItem>View Profile</MenuItem>
    </Link>
    {/* {
      authUser?.role === "recruiter" && <Link to={'/admin/job/new'} className='link'>
      <MenuItem>Recruiter Dashboard</MenuItem>
      </Link>
    } */}
    <Link to={'/admin/job/new'} className='link'>
      <MenuItem>Recruiter Dashboard</MenuItem>
      </Link>
    <MenuItem onClick={logoutHandler}>Logout</MenuItem>
    </Menu>
    </>
  )
}

export default UserMenu