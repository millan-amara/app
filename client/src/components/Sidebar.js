import { Link } from 'react-router-dom';
import { FaShopware, FaLanguage } from 'react-icons/fa';
import { BsPersonCircle, BsFillPersonFill } from 'react-icons/bs';
import { MdSecurity, MdPayment, MdContactEmergency } from "react-icons/md";
import { BiSolidDashboard } from "react-icons/bi";


function Sidebar() {

  const menus = [
    { key: "1", title: "Dashboard", path:"", icon: <BiSolidDashboard /> },
    { key: "2", title: "Languages", path:"languages", icon: <FaLanguage /> },
    { key: "3", title: "About Me", path:"about", icon: <BsPersonCircle /> },
    { key: "4", title: "Contact Info", path:"contact-info/my", icon: <MdContactEmergency /> },
    // { title: "Skills & Education", path: "skills", icon: <MdSchool />, spacing: false },
    { key: "5", title: "Payment Info", path: "payment-info", icon: <MdPayment />, spacing: true },
    // { key: "6", title: "Identity Verification", path:"identity-verification-center", icon: <MdSecurity /> },
    
    // { title: "Security", path: "security", icon: <MdSecurity /> },
    // { title: "Invite Friends", path: "invite-friends", icon: <MdSecurity /> },
  ]

  const onImageClick = (path) => {
    console.log('image')
  }
  
  return (
    <>
        <div id="sidebar" className='bg-slate-700 h-screen w-52 text-white font-serif fixed'>
          <div className='flex flex-col items-center pt-5 mb-4'>
            <FaShopware />
            <span className='text-xl'>SpherePulse</span>
            <hr className='text-xl' />
          </div>
          <div className='pt-3'>
            <ul>
              {menus.map((menu) => (
                <div key={menu.key}>
                <Link to={`/${menu.path}`} className={`text-gray-300 ${menu.path === "" && 'bg-green-700'} text-sm no-underline flex items-center cursor-pointer p-2 hover:bg-green-700 rounded-md ${menu.spacing ? "mt-9" : "mt-2"}`}>
                  <span className='text-2xl block float-left mr-3'>
                    {menu.icon}
                  </span>
                  <span name={menu.path} className='text-base font-medium flex-1'>
                    {menu.title}
                  </span>
                </Link>
                </div>
                
              ))}
              
            </ul>
          </div>
          <div id='avatar' className='flex justify-center'>
            <BsFillPersonFill alt="avatar" onClick={onImageClick} className='w-20 rounded-full h-20 bottom-4 absolute cursor-pointer' />
              {/* <img src={Potrait} /> */}
          </div>
          
        </div>
    </>
  )
}

export default Sidebar;