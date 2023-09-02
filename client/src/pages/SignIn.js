import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShopware } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';

function SignIn() {
    const [formData, setFormData] = useState({
      email: '',
      password: ''
    })
    const {email, password} = formData;
  
    const navigate = useNavigate()
  
    const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }))
    }
  
    const onSubmit = async (e) => {
      e.preventDefault();
  
      try{
        await axios.post('/login', formData)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
        navigate('/')

      } catch (error) {
        toast.error('Wrong email or password')
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
                <div id="labelDiv">Log In To Your Account</div>
                <div id="emailDiv">
                    <div><label htmlFor="email">Email</label></div>
                    <div><input
                        type="email" 
                        id="email" 
                        value={email} 
                        onChange={onChange} />
                    </div>
                </div>
                <div id="passwordDiv">
                    <div id="passwordLabels">
                        <label htmlFor="password">Password</label>
                        <Link to="/forgot-password" id="forgot">Forgot Password?</Link>
                    </div>
                    <div id="passwordInput">
                        <input 
                            type='password'
                            id="password" 
                            value={password}
                            onChange={onChange} />
                    </div>
                </div>
                <div id="buttonDiv">
                    <button className="logInButton bg-slate-700 text-white w-full rounded hover:bg-green-700 text-2xl  px-20 py-2">Log In</button>
                </div>
            </form>
        </div>
    </div>
    </>

  )
}

export default SignIn