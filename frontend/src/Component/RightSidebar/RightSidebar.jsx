import React, { useEffect, useState } from 'react'
import './right.css'
import Jobs from './Jobs'
import { useSelector } from 'react-redux'
import useGetAllJobs from '../../hooks/useGetAllJobs'

const RightSidebar = () => {
  useGetAllJobs()
  const {allJobs, searchedQuery} = useSelector((store)=> store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
        const filteredJobs = allJobs.filter((job) => {
            return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        })
        setFilterJobs(filteredJobs)
    } else {
        setFilterJobs(allJobs)
    }
}, [allJobs, searchedQuery]);
  return ( 
    <> 
      <div className="right">
        <h2>Latest Job's</h2>
        <div className="myjob">
          {
            filterJobs && filterJobs.map((job)=>{
              return  <Jobs job={job}/>
            })
          }
         
        </div>
      </div>
    </>
  )
}

export default RightSidebar