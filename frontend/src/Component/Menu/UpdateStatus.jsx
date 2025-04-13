import React from 'react'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setUpdateStatus } from '../../redux/serviceSlice.js'

const UpdateStatus = () => {
    const {status} = useSelector((store)=> store.service)
    const dispatch = useDispatch()
    const handleClose = ()=>{
        dispatch(setUpdateStatus(null))
    }
    return (
        <>
            <Dialog open={Boolean(status)} onClose={handleClose} hideBackdrop>
                <DialogContent>
                    <p>Accept</p>
                    <p>Reject</p>
                </DialogContent>
            </Dialog>
            
        </>
    )
}

export default UpdateStatus