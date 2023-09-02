import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaShopware } from 'react-icons/fa';

function SignUp() {
    const [formData, setFormData] = useState({
        sName: '',
        email: '',
        password: '',
    })

    const {sName, email, password} = formData;

    const navigate = useNavigate()

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    } 

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            if(sName === '') {
                toast.error('Please enter your name')
              }
              if(email === '') {
                toast.error('Please enter your email')
              }
              if(password === '') {
                toast.error('Please enter your password')
            }

            await axios.post('/register',
                formData
            )
            .then((response) => {
                toast.success(`Welcome, ${response.data.sName}`)
            })
            .catch((error) => {
                console.log(error)
            });

            navigate('/')
        } catch (error) {
            toast.error("Something went wrong with registration. Please check your details and try again")
        }
    }


  return (
    <>
    <div id="loginDiv">
        <div id="logDiv">
            <div className='flex flex-col items-center mb-9'>
              <FaShopware />
              <span className='text-xl'>SpherePulse</span>
            </div>
            <form onSubmit={onSubmit}>
                <Link to="/sign-in" className="labelDiv text-sm">Sign in instead?</Link>
                <div id="emailDiv">
                    <div><label htmlFor="name">Name</label></div>
                    <div>
                        <input 
                            type="text" 
                            id="sName" 
                            value={sName}
                            onChange={onChange}
                        />
                    </div>
                </div>
                <div id="emailDiv">
                    <div><label htmlFor="email">Email</label></div>
                    <div>
                        <input 
                            type="email" 
                            id="email" 
                            value={email}
                            onChange={onChange} 
                        />
                    </div>
                </div>
                <div id="passwordDiv">
                    <div id="passwordLabels">
                        <label htmlFor="password">Password</label>
                    </div>
                    <div id="passwordInput">
                        <input 
                            type='password'
                            id="password" 
                            value={password}
                            onChange={onChange} 
                        />
                    </div>
                </div>
                <div id="buttonDiv">
                    <button className="logInButton bg-slate-700 text-white w-full rounded hover:bg-green-700 text-2xl  px-20 py-2">Sign Up</button>
                </div>
            </form>
        </div>
    </div>
    </>

  )
}

export default SignUp