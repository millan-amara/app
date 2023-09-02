import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Nav from '../components/Nav'
import Compressor from 'compressorjs'
import axios from 'axios'


function Identity() {

  const [user, setUser] = useState({});
  const [showIdForm, setShowIdForm] = useState(false);
  const [showFaceForm, setShowFaceForm] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false)

  const [idFormData, setIdFormData] = useState({
    idType: '',
    idImages: [],
  })
  const [faceFormData, setFaceFormData] = useState({
    faceImage: ''
  })
  const [addressFormData, setAddressFormData] = useState({
    addressType: '',
    addressImages: [],
  })

  useEffect(() => {
    axios.get('/logged-in')
    .then((response) => {
        setUser(response.data)
    })
    .catch((error) => {
        console.log(error)
    })
  }, [])

  const { idType, idImages } = idFormData;
  const { faceImage } = faceFormData;
  const { addressType, addressImages } = addressFormData;

  const onShowIdForm = () => {
    setShowIdForm(true)
    setShowFaceForm(false)
    setShowAddressForm(false)
  }
  const onShowFaceForm = () => {
    setShowIdForm(false)
    setShowFaceForm(true)
    setShowAddressForm(false)
  }
  const onShowAddressForm = () => {
    setShowIdForm(false)
    setShowFaceForm(false)
    setShowAddressForm(true)
  }

  const onChangeId = (e) => {
    setIdFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
    }))
  
  }

  const onSelectFile = (e) => {
    // const selectedFiles = e.target.files;
    // const selectedFilesArray = Array.from(selectedFiles);

    setIdFormData((prevState) => ({
      ...prevState,
      idImages: e.target.files[0],
    }))

    // selectedFilesArray.map((file) => {

    //   new Compressor(file, {
    //     quality: 0.6,
    //     success(result) {
    //       console.log(result)
    //       console.log(file)
    //       setIdFormData((prevState) => ({
    //         ...prevState,
    //         idImages: [...prevState.idImages, {...result, name: result.name}]
    //       }))
    //     },
    //     error(err) {
    //       console.log(err.message)
    //     }
    //   })
      
    // })

    //  FOR BUG IN CHROME
    // e.target.value = "";
  }


  const onSubmitId = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/users/${user._id}/create-id`, idFormData)
      // .then((response) => {
      //   console.log(response)
      // })
    }
    catch (e) {
      console.log(e)
    }
    
  }

    return (
        <>
            <div className='container flex'>
            <Sidebar />
    
            <div id='main' className='w-full ml-56'>
              <Nav page="Verification Center" />

              <table className='w-1/2 text-base'>
                  <thead>
                    <tr className='bg-slate-300'>
                      <th className='border border-slate-300'>Verification Type</th>
                      <th className='border border-slate-300'>Verification Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className=''>
                      <td className='border border-slate-300 py-2 pl-2'>National ID/Passport</td>
                      <td className='border border-slate-300 pl-2 py-2'>
                        <button onClick={onShowIdForm} className='underline text-orange-600 w-full'>Verify</button>
                      </td>
                    </tr>
                    <tr>
                      <td className='border border-slate-300 py-2 pl-2'>Face Verification</td>
                      <td className='border border-slate-300 pl-2 py-2'>
                        <button onClick={onShowFaceForm} className='underline text-orange-600 w-full'>Verify</button>
                      </td>
                    </tr>
                    <tr>
                      <td className='border border-slate-300 py-2 pl-2'>Address Verification</td>
                      <td className='border border-slate-300 pl-2 py-2'>
                        <button onClick={onShowAddressForm} className='underline text-orange-600 w-full'>Verify</button>
                      </td>
                    </tr>
                  </tbody>
                </table>

                {showIdForm &&
                <div className='mt-8 w-1/2 text-sm'>
                  <p>Any government-issued identification that includes your picture, your full name, and your date of birth. A National ID, driver's license, passport, or visa will work just fine. Make sure the document hasn't expired. </p>
                  <form onSubmit={onSubmitId} className='flex flex-col mt-5'>
                    <select name="idType" id="idType" value={idType} onChange={onChangeId} className='mb-3 focus:ring-2 focus:outline-none appearance-none text-sm leading-6 text-slate-900 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm'>
                      <option disabled value="">Select document type</option>
                      <option value="Id">National ID</option>
                      <option value="Passport">Passport</option>
                      <option value="Visa">Visa</option>
                      <option value="Licence">Driver's Licence</option>
                    </select>
                    <input type="file" name="image" id="image" onChange={onSelectFile} accept='image/*' />
                    <button type="submit" className="bg-gradient-to-r from-slate-600 to-slate-800 text-white w-full py-2 rounded-md mt-4">Submit</button>
                  </form>
                </div>
                }
                {showFaceForm &&
                <div className='mt-8'>
                  <form className='flex flex-col'>
                    <p>Upload a photo holding the ID</p>
                    <input type="file" name="" id="" />

                  </form>
                </div>
                }
                {showAddressForm &&
                <div className='mt-8'>
                  <form className='flex flex-col text-sm'>
                    <select name="id" id="id" onChange={onChangeId}>
                      <option disabled value="">Select document type</option>
                      <option value="id">Bank letter</option>
                      <option value="Passport">Passport</option>
                    </select>
                    <input type="file" name="" id="" />

                  </form>
                </div>
                }

    
            </div>
            </div>    
        </>
    )
}

export default Identity