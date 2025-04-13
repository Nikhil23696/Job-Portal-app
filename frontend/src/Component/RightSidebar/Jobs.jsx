import React from 'react'
import './right.css'
import { Typography } from '@mui/material'
import {Link} from 'react-router-dom'

const Jobs = ({job}) => {
    
    return (
        <>
            <div className="job">
                <img src="https://cdn.iconscout.com/icon/free/png-256/free-google-logo-icon-download-in-svg-png-gif-file-formats--brands-pack-logos-icons-189824.png?f=webp&w=128" width={'40vw'} />

                <h3>{job?.title}</h3>
                <div className="detail">
                    <Typography sx={{
                        border: '1px solid rgb(177, 177, 177)',
                        padding: '0.5vmax',
                        backgroundColor: 'rgb(170, 218, 238)'
                    }}>{job?.jobType}</Typography>
                    <Typography className ='position'sx={{
                        border: '1px solid rgb(177, 177, 177)',
                        padding: '0.5vmax',
                        backgroundColor: 'rgb(220, 186, 154)'
                    }}>{job?.positions} Positions</Typography>
                </div>
                <p>{job?.description}</p>
                <div className="detail">
                    <Link className='link' to={`/job/${job?._id}`}>
                    <Typography sx={{
                        border: '1px solid rgb(177, 177, 177)',
                        padding: '0.5vmax',
                        backgroundColor: 'blue',
                        color: 'white',
                        transition:'all 0.5s',   
                        ":hover":{
                            cursor:'pointer',
                            backgroundColor:'rgb(44, 39, 197)',
                        }
                    }}>Details</Typography>
                    </Link>
                    <Typography sx={{
                        border: '1px solid rgb(177, 177, 177)',
                        padding: '0.5vmax',

                    }}>Save for Later</Typography>
                </div>
            </div>
        </>
    )
}

export default Jobs