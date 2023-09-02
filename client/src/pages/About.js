import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';

function About() {

  const [user, setUser] = useState(false)
  const [formData, setFormData] = useState({
    dob: '',
    gender: '',
    nationality: '',
    residence: ''
  })

  const {dob, gender, nationality, residence} = formData;

  const navigate = useNavigate();


    useEffect(() => {
        axios.get('/logged-in')
        .then((response) => {
            setUser(response.data)
            setFormData({
              ...response.data,
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])

    const onChange = (e) => {
      setFormData((prevState) => ({
          ...prevState,
          [e.target.id]: e.target.value,
      }))
    }

    const onSubmit = async (e) => {
      e.preventDefault();

      await axios.put(`/users/${user._id}`, formData)
      .then((response) => {
        console.log(response)
        toast.success('Saved changes')
        navigate('/')
      })
      .catch((error) => {
        console.log(error)
        toast.error("Couldn't save changes")
      })
      
    }

  return (
    <>
      <div className='container flex'>
        <Sidebar />

        <div id='main' className='w-full ml-56'>
          <Nav page="My Profile" username={user.sName} />

          <div className='w-1/2 mt-10 text-sm'>
           <form onSubmit={onSubmit}>
            <div className='mb-5'>
                <label htmlFor="dob">Year of Birth</label>
                <input 
                    type="text" 
                    id='dob'
                    value={dob}
                    className="mt-1 focus:ring-2 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm" 
                    onChange={onChange}
                />
            </div>
            <div className='mb-5'>
                <label htmlFor="gender">Gender</label>
                <input 
                    type="text" 
                    id='gender'
                    value={gender}
                    className="mt-1 focus:ring-2 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm" 
                    onChange={onChange}
                />
            </div>
            <div className='mb-5'>
                <label htmlFor="nationality" className='mt-5'>Nationality</label>
                <input 
                    type="text" 
                    id='nationality'
                    value={nationality}
                    className="mt-1 focus:ring-2 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm" 
                    onChange={onChange}
                />
            </div>
            <div className='mb-5'>
                <label htmlFor="residence" className='mt-5'>Country of Residence</label>
                <input 
                    type="text" 
                    id='residence'
                    value={residence}
                    className="mt-1 focus:ring-2 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm" 
                    onChange={onChange}
                />
            </div>
            <div >
              <button className='flex bg-gradient-to-r from-slate-600 to-slate-800 text-white w-full py-2 rounded-md items-center justify-center'>Save Changes</button>
            </div>
           </form>
          </div>

        </div>
      </div>
    </>
  )
}

export default About