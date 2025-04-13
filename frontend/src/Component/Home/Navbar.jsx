import { Avatar, Typography } from '@mui/material'
import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getMyAccountMenu } from '../../redux/serviceSlice'

const Navbar = () => {
  const {authUser} = useSelector((store)=> store.user)
  const dispatch = useDispatch()
  const handleAccountMenu = ()=>{
     dispatch(getMyAccountMenu(true))
  }
  return (
    <>
      <div className="nav">
        <Link to={'/'}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/EJobs_Logo.svg/1280px-EJobs_Logo.svg.png" width={'100vw'} />
        </Link>
        <div className="user">
          <Avatar onClick={handleAccountMenu} src={authUser?.avatar?.url}/>
        </div>
      </div>
    </>
  )
}

export default Navbar