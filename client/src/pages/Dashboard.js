import React from 'react'
import Sidebar from '../components/Sidebar'
import { Link } from 'react-router-dom'

function Dashboard() {
  return (
    <div>
      <Sidebar />

    <div className='ml-60'>
    <Link to='/languages/create-test' className=''>CREATE TEST</Link>
    </div>
      
    </div>
  )
}

export default Dashboard