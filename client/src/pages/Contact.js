import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';
import { FaSkype } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { AiOutlineWechat } from 'react-icons/ai';
import { toast } from 'react-toastify';

function Contact() {

  const [user, setUser] = useState({})
  const [formData, setFormData] = useState({
    phone: '',
    skype: '',
    wechat: '',
  })

  const {phone, skype, wechat} = formData;

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
      navigate('/contact-info/my')
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
          <Nav page="Contact Info" />
          

          <div id='contact' className='w-1/2 mt-10 text-sm'>
           <form onSubmit={onSubmit}>
           <div className='mb-5'>
                <div className='flex items-center'>
                  <label>Primary Email</label>
                  <MdEmail className='ml-1' />
                </div>
                <div className='mt-1 focus:ring-2 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm'>
                  {user.email}
                </div>
            </div>
            <div className='mb-5'>
                <div className='flex items-center'>
                  <label htmlFor="phone">Primary Phone</label>
                  <FaPhone className='ml-1' />
                </div>
                <input 
                    type="text" 
                    id='phone'
                    value={phone}
                    className="mt-1 focus:ring-2 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm" 
                    onChange={onChange}
                />
            </div>
            <div className='mb-5'>
              <div className='flex items-center'>
                <label htmlFor="skype">Skype (optional)</label>
                <FaSkype className='ml-1' />
                </div>
                <input 
                    type="text" 
                    id='skype'
                    value={skype}
                    className="mt-1 focus:ring-2 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm" 
                    onChange={onChange}
                />
            </div>
            <div className='mb-5'>
              <div className='flex items-center'>
                <label htmlFor="wechat">WeChat (optional)</label>
                <AiOutlineWechat className='ml-1'/>
                </div>
                <input 
                    type="text" 
                    id='wechat'
                    value={wechat}
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


export default Contact;