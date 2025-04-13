import React from 'react'
import './Home.css'
import Navbar from './Navbar'
import Banner from './Banner'
import LeftSidebar from '../LeftSidebar'
import RightSidebar from '../RightSidebar/RightSidebar'
import UserMenu from '../Menu/UserMenu'
import UpdateProfile from '../Menu/UpdateProfile'

const Home = () => {
    return (
        <>
            <div className="home">
                <Banner/>
                <div className="homecontent">
                    <LeftSidebar/>
                    <RightSidebar/>
                </div>
                <UserMenu/>
              
            </div>
        </>
    )
}

export default Home