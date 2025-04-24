import React, { useEffect, useState } from 'react'
import './Signup.css'
import { Button, CircularProgress } from '@mui/material'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom' 
import { useDispatch, useSelector } from 'react-redux'
import { setAuthUser } from '../../redux/userSlice.js'

const Login = () => {
    const navigate = useNavigate();
    const {authUser} = useSelector(store=>store.user);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [input,setInput] = useState({
        email: "",
        password: "",
        role: "user",
    })

    const handleForm = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const res = await axios.post('https://kaamkarlo.onrender.com/api/v1/user/login', input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            console.log(res.data)
            if (res.data.success) {
                toast.success(res.data.message)
                dispatch(setAuthUser(res.data.myUser));
                
                setInput({
                    email:"",
                    password:"",
                    role:"user"
                })
                navigate("/");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
        setLoading(false)
    }

    useEffect(()=>{
      if(authUser){
        navigate("/")
      }
    },[])
    return (
        <>
            <div className="signup">
                <form
                    className="signupform"
                    onSubmit={handleForm}
                >
                    <h2>Login to Your Account</h2>

                    <div className="input">

                        <input
                            type="email"
                            placeholder='Email'
                            required
                            value={input.email}
                            name='email'
                            onChange={(e) => setInput({...input, [e.target.name]: e.target.value })}
                        />
                        <input
                            type="password"
                            placeholder='Password'
                            required
                            value={input.password}
                            name='password'
                            onChange={(e) => setInput({...input, [e.target.name]: e.target.value })}
                        />
                        <select value={input.role} name='role' onChange={(e) => setInput({...input, [e.target.name]: e.target.value })}>
                            <option value="recruiter">recruiter</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                    <Button variant='contained' fullWidth type='submit'>
                        {
                            loading ? (<CircularProgress color='' width={'30px'} />) : ('Login')
                        }
                    </Button>
                    <p>Does not have Account? then <Link to={'/signup'} className='link'><span className='sp'>Signup</span></Link></p>
                </form>
            </div>
        </>
    )
}

export default Login 