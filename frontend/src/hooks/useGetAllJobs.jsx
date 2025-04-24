import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { getAllJobs } from '../redux/jobSlice';

const useGetAllJobs = ()=>{
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector((store)=> store.job)
    useEffect(()=>{
        const fetchJobs = async()=>{
            try {
               const res = await axios.get(`https://kaamkarlo.onrender.com/api/v1/job/all/?keyword=${searchedQuery}`, {withCredentials: true});
               dispatch(getAllJobs(res.data.job)) 
            } catch (error) {
                console.log(error)
            }
        }
        fetchJobs()
    },[dispatch])
}
export default useGetAllJobs