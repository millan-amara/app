import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { BsFillPersonFill } from 'react-icons/bs';
import axios from 'axios';
import backgroundVideo from '../assets/videos/homefive.mp4';

function Dashboard() {

  const [user, setUser] = useState(false);

  useEffect(() => {
    axios.get('/logged-in')
    .then((response) => {
        setUser(response.data)
    })
    .catch((error) => {
        console.log(error)
    })
  }, [])

  return (
    <div>
      <Sidebar />

    <div className='ml-60'>
    {/* <Link to='/languages/create-test' className=''>CREATE TEST</Link> */}
    

      <div id='avatar' className='flex justify-center flex-col items-center h-screen text-green-700'>
          <BsFillPersonFill alt="avatar" className='w-40 rounded-full h-40 mt-4 cursor-pointer' />
          <p id='welcome' className='italic text-3xl font-bold'>Hello, {user.sName} </p>
      </div>
     
    </div>
      
    </div> 
  )
}

export default Dashboard