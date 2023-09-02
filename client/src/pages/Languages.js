import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';
import LanguageOptions from '../components/LanguageOptions';
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg'

function Languages() {

  const [user, setUser] = useState({})
  const [showNativeForm, setShowNativeForm] = useState(false)
  const [showSpokenForm, setShowSpokenForm] = useState(false)
  const [showTranslationForm, setShowTranslationForm] = useState(false)
  const [nativeLanguages, setNativeLanguages] = useState([])
  const [spokenLanguages, setSpokenLanguages] = useState([])
  const [translationLanguages, setTranslationLanguages] = useState([])
  const [formDataNative, setFormDataNative] = useState({
    native: '',
  })
  const [formDataSpoken, setFormDataSpoken] = useState({
    spoken: '',
  })
  const [formDataTranslation, setFormDataTranslation] = useState({
    from: '',
    to: ''
  })

  const {native} = formDataNative;
  const {spoken} = formDataSpoken;
  const {from, to} = formDataTranslation;
 

  const navigate = useNavigate();

  useEffect(() => {
      axios.get('/logged-in')
      .then((response) => {
          setUser(response.data)
          setNativeLanguages(response.data.native)
          setSpokenLanguages(response.data.spoken)
          setTranslationLanguages(response.data.translation)
      })
      .catch((error) => {
          console.log(error)
      })
  }, [nativeLanguages])


  const onNativeChange = (e) => {
    setFormDataNative((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  const onSpokenChange = (e) => {
    setFormDataSpoken((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  const onTranslationChange = (e) => {
    setFormDataTranslation((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

    const onSubmitNative = async (e) => {
      e.preventDefault();

      await axios.put(`/users/${user._id}/nativelanguages`, formDataNative)
      .then((response) => {
        console.log(response)
        setShowNativeForm(false)
        toast.success('Saved changes')
        navigate('/languages')
      })
      .catch((error) => {
        console.log(error)
        toast.error("Couldn't save changes")
      })
    }

    const onSubmitSpoken = async (e) => {
      e.preventDefault();
      console.log(formDataSpoken)
      await axios.put(`/users/${user._id}/spokenlanguages`, formDataSpoken)
      .then((response) => {
        console.log(response)
        setShowSpokenForm(false)
        toast.success('Saved changes')
        navigate('/languages')
      })
      .catch((error) => {
        toast.error("Couldn't save changes")
      })
    }

    const onSubmitTranslation = async (e) => {
      e.preventDefault();
      await axios.put(`/users/${user._id}/translationlanguages`, formDataTranslation)
      .then((response) => {
        console.log(response)
        setShowTranslationForm(false)
        toast.success('Saved changes')
        navigate('/languages')
      })
      .catch((error) => {
        console.log(error)
        toast.error("Couldn't save changes")
      })
    }

    const onDelete = async (item) => {
      if (window.confirm(`Are you sure you want to delete ${item}?`)) {
        console.log({ item })
        // setSpokenLanguages(spokenLanguages.filter((item) => item !== item))
        await axios.put(`/users/${user._id}/deletespokenlanguages`, { item })
        .then((response) => {
          toast.success(`Succesfully removed`)
        })
        
      }
    }

    const handleNativeForm = () => {
      if(showNativeForm === false) {
        setShowNativeForm(true);
      } else {
        setShowNativeForm(false)
      }
    }

    const handleSpokenForm = () => {
      if(showSpokenForm === false) {
        setShowSpokenForm(true);
      } else {
        setShowSpokenForm(false)
      }
    }

    const handleTranslationForm = () => {
      if(showTranslationForm === false) {
        setShowTranslationForm(true);
      } else {
        setShowTranslationForm(false)
      }
    }

  
  

  return (
    <>
      <div className='container flex'>
        <Sidebar />

        <div id='main' className='w-full ml-56'>
          <Nav page="Languages" />
          
          <div id='languages'>
            <div className='w-1/2'>
              <div>Native Language(s)</div>
              {nativeLanguages.length < 2 ?
              <>
                <button className='bg-slate-700 py-2 px-4 w-full text-white' onClick={handleNativeForm}>Add Native language</button>
              </> : <>
                <button disabled className='bg-slate-700 py-2 px-4 w-full text-white' onClick={handleNativeForm}>Max languages (2) reached!</button>

              </>}
              <div className={`py-3 ${!showNativeForm && "hidden"} duration-700 mb-5 border border-t-0 border-slate-700 border-solid`}>
               
                <form onSubmit={onSubmitNative} className='flex justify-between px-3'>
                <select name="native" id="native" onChange={onNativeChange} value={native}>
                 <LanguageOptions />

                </select>
                <button className='bg-green-700 py-1 px-2 w-24 text-white mt-1 rounded-sm'>Add</button>
                </form>
                
              </div>
              <div>
                <ul>
                {nativeLanguages && nativeLanguages.map((language, index) => (
                  <div key={language}>
                  <li className='flex justify-between mb-2'>
                    {index+1}.
                    {language}
                    {/* <Link to='/verify'>Verify</Link> */}
                  </li>
                  </div>
                ))}
                </ul>
                
              </div>

            </div>

            <div className='mt-7 w-1/2'>
              <div>Spoken Language(s)</div>
              {spokenLanguages.length < 3 ? 
              <>
                <button className='bg-slate-700 py-2 px-4 w-full text-white' onClick={handleSpokenForm}>Add Spoken language</button>
              </> :
                <button disabled className='bg-slate-700 py-2 px-4 w-full text-white' onClick={handleSpokenForm}>Max languages (3) reached!</button>
              }
              <div className={`py-3 ${!showSpokenForm && "hidden"} mb-5 border border-t-0 border-slate-700 border-solid`}>
              
                <form onSubmit={onSubmitSpoken} className='flex justify-between px-3'>
                <select name="spoken" id="spoken" onChange={onSpokenChange} value={spoken}>
                  <LanguageOptions />

                </select>
                <button className='bg-green-700 py-1 px-2 w-24 text-white mt-1 rounded-sm'>Add</button>
                </form>
        
              </div>
              <div>
                <ul>
                {spokenLanguages && spokenLanguages.map((language, index) => (
                  <div key={language}>
                  <li item={language} className='flex justify-between mb-2'>
                    {index+1}.
                    {language}
                    <form>
                    <DeleteIcon 
                      className='cursor-pointer'
                      fill='rgb(231, 76, 60'
                      onClick={() => onDelete(language)}
                      />
                    </form>
                  </li>
                  </div>
                ))}
                </ul>
                
              </div>
            </div>

            <div className="mt-7 w-1/2">
              <div>Translation Language(s)</div>
              {translationLanguages.length < 3 ?
              <>
                <button className='bg-slate-700 py-2 w-full px-4 rounded text-white' onClick={handleTranslationForm}>Add Translation language</button>
              </> : <>
                <button disabled className='bg-slate-700 py-2 w-full px-4 rounded text-white' onClick={handleTranslationForm}>Max languages (3) reached</button>
              </>}
              <div className={`py-3 ${!showTranslationForm && "hidden"} mb-5 border border-t-0 border-slate-700 border-solid`}>
                <form onSubmit={onSubmitTranslation} className='flex justify-between px-3'>
                <div>
                  <div className='flex mb-3'>
                    <p className='mr-2'>From:</p>
                    <select name="from" id="from" onChange={onTranslationChange} value={from}>
                      <LanguageOptions />
                    </select>
                  </div>
                  <div className='flex'>
                    <p className='mr-7'>To:</p>
                    <select name="to" id="to" onChange={onTranslationChange} value={to}>
                      <LanguageOptions />
                    </select>
                  </div>
                </div>

                <button className='bg-green-700 py-1 px-2 w-24 text-white mt-1 rounded-sm'>Add</button>
                </form>
              </div>

              <div className=''>
                <table className='w-full hover:border-separate'>
                  <thead>
                    <tr className='bg-slate-300'>
                      <th></th>
                      <th className='border border-slate-300'>Source Language</th>
                      <th className='border border-slate-300'>Destination Language</th>
                    </tr>
                  </thead>

                  <tbody>
                  {translationLanguages && translationLanguages.map((language, index) => (
                    <tr key={index}>
                      <td className='border border-slate-300 py-2 pl-2'>{index+1}.</td>
                      <td className='border border-slate-300 pl-2'>{language.from}</td>
                      <td className='border border-slate-300 pl-2'>{language.to}</td>
                    </tr>
                  ))}
                  </tbody>
                </table>
                
                
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Languages;