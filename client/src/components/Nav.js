import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Nav({ page }) {

  const navigate = useNavigate();

  const onLogout = () => {
    axios.get('/logout')
    navigate('/sign-in')
  }
  
  return (
    <>
    <div id='main' className='w-full'>
        <div className='right-0 left-60 flex justify-between items-center justify-center pt-4 pb-2'>
          <div className='px-4 text-sm ml-3 py-1 rounded'>{page}</div>
          <div className='px-4 flex'>
              {/* <button className='hover:bg-green-700 hover:text-white mt-1 px-4 rounded-md duration-300 text-lg'><MdEmail /></button> */}
              <button onClick={onLogout} className='pt-1 pb-2 px-3 w-24 duration-300 text-sm rounded-full text-white bg-slate-700 hover:bg-white hover:text-slate-700 underline'>Log out!</button>
          </div>
        </div>
    </div>
    </>
  )
}

export default Nav;