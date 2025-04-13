import React, { useEffect, useState } from 'react'
import './left.css'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '../redux/jobSlice.js'
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        fitlerType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]

const LeftSidebar = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const changeHandler = (event) => {
        setSelectedValue(event.target.value);
    }

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue))
    }, [selectedValue])
    return (
        <>
            <div className="left">
                <div className="category">
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">
                            {
                                fitlerData.map((data, index) => (
                                    <>
                                        <h2>{data.fitlerType}</h2>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue="female"
                                            name="radio-buttons-group"
                                            value={selectedValue}
                                            onChange={changeHandler}
                                        >
                                            {
                                                data.array.map((item, idx) => {
                                                    const itemId = `id${index}-${idx}`
                                                    return (

                                                        <FormControlLabel value={item}
                                                            id={itemId}
                                                            control={<Radio />} label={item} />
                                                    )
                                                })
                                            }
                                        </RadioGroup>
                                    </>
                                ))
                            }
                        </FormLabel>
                    </FormControl>
                    
                </div>
            </div>
        </>
    )
}

export default LeftSidebar