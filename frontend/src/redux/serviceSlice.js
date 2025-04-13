import { createSlice } from '@reduxjs/toolkit'

const serviceSlice = createSlice({
    name:"service",
    initialState:{
        updateProfile:null,
        accountMenu: null,
        darkMode: false,
        updateJob: null,
        status: null,
    },
    reducers:{
        setUpdateMyProfile:(state, action)=>{
            state.updateProfile = action.payload
        },
        getMyAccountMenu:(state, action)=>{
            state.accountMenu = action.payload
        },
        toggleTheme:(state)=>{
            state.darkMode = !state.darkMode
        },
        setUpdateJob:(state,action)=>{
            state.updateJob = action.payload
        },
        setUpdateStatus:(state,action)=>{
            state.status = action.payload
        }
    }
})
export const {setUpdateMyProfile, getMyAccountMenu, toggleTheme, setUpdateJob, setUpdateStatus} = serviceSlice.actions;
export default serviceSlice.reducer