import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { getMyAllAppliedJob } from '../redux/jobSlice';

const useGetAppliedJob = ()=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchMyJobs = async()=>{
            try {
               const res = await axios.get('https://kaamkarlo.onrender.com/api/v1/application/applied/job', {withCredentials: true});
               dispatch(getMyAllAppliedJob(res.data.application)) 
            } catch (error) {
                console.log(error)
            }
        }
        fetchMyJobs()
    },[dispatch])
}
export default useGetAppliedJob