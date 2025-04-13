import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { getJobDetails } from '../redux/jobSlice.js';

const useGetAllJobs = (id)=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchJobDetails = async()=>{
            try {
                console.log("hi")
               const res = await axios.get(`http://localhost:8080/api/v1/job/${id}`, {withCredentials: true});
               console.log(res.data)
               dispatch(getJobDetails(res.data.job)) 
            } catch (error) {
                console.log(error)
            }
        }
        fetchJobDetails()
    },[dispatch, id])
}
export default useGetAllJobs 