import React, { useState } from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../../redux/jobSlice';

const Banner = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = ()=>{
        dispatch(setSearchedQuery(query));
        navigate('/browse')
    }
    return (
        <>
            <div className="banner">
                <h1>Find Your Dream Job Now</h1>
                <h3>5 lakh + Job for you to explore</h3>
                <div className="inputfield">
                    <input 
                    type="text"
                    placeholder='Search for Job' 
                    onChange={(e) => setQuery(e.target.value)}
                    />
                    <button onClick={searchJobHandler}>Search</button>
                </div>
            </div>
        </>
    )
}

export default Banner