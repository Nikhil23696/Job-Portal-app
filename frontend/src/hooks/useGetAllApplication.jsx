import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { getAllApplication } from '../redux/jobSlice';

const useGetAllApplication = ()=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchApplication = async()=>{
            try {
               const res = await axios.get('http://localhost:8080/api/v1/application/all', {withCredentials: true});
               dispatch(getAllApplication(res.data. application)) 
            } catch (error) {
                console.log(error)
            }
        }
        fetchApplication()
    },[dispatch])
}
export default useGetAllApplication