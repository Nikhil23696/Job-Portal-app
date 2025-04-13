import { createSlice } from '@reduxjs/toolkit'

const jobSlice = createSlice({
    name: "job",
    initialState:{
        allJobs: null,
        jobDetails: null,
        applyJob: null,
        allAppliedJob: null,
        application: null,
        searchedQuery:"",
    },
    reducers:{
        getAllJobs:(state, action)=>{
            state.allJobs = action.payload
        },
        getJobDetails:(state,action)=>{
            state.jobDetails = action.payload
        },
        removeJob:(state,action)=>{
            state.allJobs = state.allJobs.filter(item => item._id !== action.payload)
        },
        getMyAppliedJobs:(state,action)=>{
            state.applyJob = [action.payload]
        },
        getMyAllAppliedJob:(state,action)=>{
            state.allAppliedJob = action.payload
        },
        getAllApplication:(state,action)=>{
            state.application = action.payload
        },
        setSearchedQuery:(state,action) => {
            state.searchedQuery = action.payload;
        }
    }
})
export const {getAllJobs, getJobDetails, removeJob, getMyAppliedJobs, getMyAllAppliedJob, getAllApplication, setSearchedQuery} = jobSlice.actions;
export default jobSlice.reducer