import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Nav from '../components/Nav'
import { BsBank } from 'react-icons/bs'
import { FaPaypal } from 'react-icons/fa'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Payment() {
    const [user, setUser] = useState({})
    const [showPaypalForm, setShowPaypalForm] = useState(false)
    const [showBankForm, setShowBankForm] = useState(false)
    const [paypalFormData, setPaypalFormData] = useState({
        country: '',
        paypalEmail: '',
        currency: ''
    })
    const [bankFormData, setBankFormData] = useState({
        beneficiaryName: '',
        beneficiaryCountry: '',
        beneficiaryAddress: '',
        beneficiaryPhone: '',
        bankName: '',
        bankCode: '',
        bankCountry: '',
        bankAddress: '',
        swiftCode: '',
        iban: '',
        accountNumber: '',
        routingNumber: '',
    })

    const {country, paypalEmail, currency} = paypalFormData;
    const {beneficiaryName,beneficiaryCountry,beneficiaryAddress,beneficiaryPhone,bankName,bankCode,bankCountry,bankAddress,swiftCode,iban,accountNumber,routingNumber} = bankFormData;

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/logged-in')
        .then((response) => {
            setUser(response.data)
            if(response.data.bank){
                setBankFormData(response.data.bank)
            }
            if(response.data.paypal){
                setPaypalFormData(response.data.paypal)
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])

    const handleShowPaypalForm = () => {
        if(showPaypalForm === true) {
            setShowPaypalForm(false)
        } else {
            setShowPaypalForm(true)
        }
        setShowBankForm(false)
    }
    const handleShowBankForm = () => {
        if(showBankForm === true) {
            setShowBankForm(false)
        } else {
            setShowBankForm(true)
        }
        setShowPaypalForm(false)
    }

    const onPaypalChange = (e) => {
        setPaypalFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    const onBankChange = (e) => {
        setBankFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    const onPaypalSubmit = async (e) => {
        try{
            e.preventDefault();
            if(country && paypalEmail && currency){
                await axios.post(`/users/${user._id}/update-paypal`, paypalFormData);
                setShowPaypalForm(false);
                toast.success('Successfully added PayPal account')
                navigate('/payment-info')
            } else {
                toast.error('Please fill up all fields')
            }
        }catch(e) {
            toast.error('Failed, please try again')
        }
        
    }

    const onBankSubmit = async (e) => {
        e.preventDefault();
        try{
            if(beneficiaryName && beneficiaryCountry && beneficiaryAddress && beneficiaryPhone && bankName && bankCode && bankCountry && bankAddress && swiftCode && iban && accountNumber) {
                await axios.post(`/users/${user._id}/update-bank`, bankFormData);
                setShowBankForm(false);
                navigate('/payment-info')
                toast.success('Successfully added Bank account')
            } else {
                toast.error('Please fill up all fields')
            }
        } catch(e) {
            toast.error('Failed, please try again')
        }
        
    }

  return (
    <>
        <div className='container flex'>
        <Sidebar />

        <div id='main' className='w-full ml-56'>
          <Nav page="Payment Profile" />
          <div className=''>
            <p>Please addd either a Paypal account or bank account</p>
          </div>

          <div className='flex w-1/2 justify-between mt-5 font-bold'>
            
            {user.paypal ?
            <div onClick={handleShowPaypalForm} className='flex cursor-pointer bg-gradient-to-r from-blue-950 to-blue-600 hover:from-blue-600 hover:to-blue-950 text-white px-5 w-1/3 py-2 rounded-3xl items-center justify-center'>
                <FaPaypal />
                <p className='pl-1'>Edit PayPal</p>
            </div> :
            <>
                <div onClick={handleShowPaypalForm} className='flex cursor-pointer bg-gradient-to-r from-blue-950 to-blue-600 hover:from-blue-600 hover:to-blue-950 text-white px-5 w-1/3 py-2 rounded-3xl items-center justify-center'>
                <FaPaypal />
                <p className='pl-1'>Add PayPal</p>
                </div>
            </>
            }
            {user.bank ? 
            <div onClick={handleShowBankForm} className='flex cursor-pointer bg-gradient-to-r from-orange-800 to-orange-400 hover:from-orange-400 hover:to-orange-800 text-white px-5 w-1/3 py-2 rounded-3xl items-center justify-center'>
                <BsBank />
                <p className='pl-1'>Edit Bank</p>
            </div> :
            <>
                <div onClick={handleShowBankForm} className='flex cursor-pointer bg-gradient-to-r from-orange-800 to-orange-400 hover:from-orange-400 hover:to-orange-800 text-white px-5 w-1/3 py-2 rounded-3xl items-center justify-center'>
                <BsBank />
                <p className='pl-1'>Add Bank</p>
            </div>
            </>
            }
          </div>

        {showPaypalForm &&
          <div className='w-1/2 mt-10 text-sm'>
           <form onSubmit={onPaypalSubmit}>
            <div className='mb-5'>
                <label htmlFor="country">Beneficiary Country</label>
                <input 
                    type="text" 
                    id='country'
                    value={country}
                    className="mt-1 focus:ring-2 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm" 
                    onChange={onPaypalChange}
                />
            </div>
            <div className='mb-5'>
                <label htmlFor="paypalEmail">Paypal Email</label>
                <input 
                    type="text" 
                    id='paypalEmail'
                    value={paypalEmail}
                    className="mt-1 focus:ring-2 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm" 
                    onChange={onPaypalChange}
                />
            </div>
            <div className='mb-5'>
                <label htmlFor="currency" className='mt-5'>Accepted Currency</label>
                <input 
                    type="text" 
                    id='currency'
                    value={currency}
                    className="mt-1 focus:ring-2 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm" 
                    onChange={onPaypalChange}
                />
            </div>
            <div >
                <button className='flex bg-gradient-to-r from-slate-600 to-slate-800 text-white w-full py-2 rounded-md items-center justify-center'>Save Paypal</button>
            </div>
           </form>
          </div>
        }

        {showBankForm &&
          <div className='w-3/4 mt-10 text-sm'>
            <form>
            <div className='lg:columns-3 md:columns-2'>
            <div className='mb-5'>
                <label htmlFor="beneficiaryName">Beneficiary Name</label>
                <input 
                    type="text" 
                    value={beneficiaryName}
                    id='beneficiaryName'
                    className="mt-1 focus:ring-2 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm" 
                    onChange={onBankChange}
                />
            </div>
            <div className='mb-5'>
                <label htmlFor="beneficiaryCountry">Beneficiary Country</label>
                <input 
                    type="text" 
                    value={beneficiaryCountry}
                    id='beneficiaryCountry'
                    className="mt-1 focus:ring-2 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm" 
                    onChange={onBankChange}
                />
            </div>
            <div className='mb-5'>
                <label htmlFor="beneficiaryAddress">Beneficiary Address</label>
                <input 
                    type="text" 
                    value={beneficiaryAddress}
                    id='beneficiaryAddress'
                    className="mt-1 focus:ring-2 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm" 
                    onChange={onBankChange}
                />
            </div>
            <div className='mb-5'>
                <label htmlFor="beneficiaryPhone">Beneficiary Phone Number</label>
                <input 
                    type="text" 
                    value={beneficiaryPhone}
                    id='beneficiaryPhone'
                    className="mt-1 focus:ring-2 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm" 
                    onChange={onBankChange}
                />
            </div>
            <div className='mb-5'>
                <label htmlFor="bankName">Bank Name</label>
                <input 
                    type="text" 
                    value={bankName}
                    id='bankName'
                    className="mt-1 focus:ring-2 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm" 
                    onChange={onBankChange}
                />
            </div>
            <div className='mb-5'>
                <label htmlFor="bankCode">Bank Code</label>
                <input 
                    type="text" 
                    value={bankCode}
                    id='bankCode'
                    className="mt-1 focus:ring-2 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm" 
                    onChange={onBankChange}
                />
            </div>
            <div className='mb-5'>
                <label htmlFor="bankCountry">Bank Country</label>
                <input 
                    type="text" 
                    value={bankCountry}
                    id='bankCountry'
                    className="mt-1 focus:ring-2 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm" 
                    onChange={onBankChange}
                />
            </div>
            <div className='mb-5'>
                <label htmlFor="bankAddress">Bank Address</label>
                <input 
                    type="text" 
                    value={bankAddress}
                    id='bankAddress'
                    className="mt-1 focus:ring-2 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm" 
                    onChange={onBankChange}
                />
            </div>
            <div className='mb-5'>
                <label htmlFor="swiftCode">SWIFT Code</label>
                <input 
                    type="text" 
                    value={swiftCode}
                    id='swiftCode'
                    className="mt-1 focus:ring-2 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm" 
                    onChange={onBankChange}
                />
            </div>
            <div className='mb-5'>
                <label htmlFor="iban">IBAN</label>
                <input 
                    type="text" 
                    value={iban}
                    id='iban'
                    className="mt-1 focus:ring-2 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm" 
                    onChange={onBankChange}
                />
            </div>
            <div className='mb-5'>
                <label htmlFor="accountNumber">Bank Account Number</label>
                <input 
                    type="text" 
                    value={accountNumber}
                    id='accountNumber'
                    className="mt-1 focus:ring-2 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm" 
                    onChange={onBankChange}
                />
            </div>
            <div className='mb-5'>
                <label htmlFor="routingNumber">Bank Routing Number</label>
                <input 
                    type="text" 
                    value={routingNumber}
                    id='routingNumber'
                    placeholder='Leave empty if unavailable'
                    className="mt-1 focus:ring-2 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm" 
                    onChange={onBankChange}
                />
            </div>
            </div>
            <div >
                <button onClick={onBankSubmit} className='flex bg-gradient-to-r from-slate-600 to-slate-800 text-white w-full py-2 rounded-md items-center justify-center'>Save Bank Details</button>
            </div>
            </form>
          </div>
        }

        <div className='flex'>
        {user.paypal &&
            <div className='flip-box '>
                <div className="flip-box-inner mt-10 cursor-pointer bg-gradient-to-r from-blue-950 to-blue-600 text-white px-5 w-1/2 py-5">
                    <div className="flip-box-front flex justify-center items-center">
                        <FaPaypal className='text-9xl'/>
                    </div>
                    <div className="flip-box-back">
                        <p className='pt-5 pb-1'>PAYPAL ACCOUNT DETAILS</p>
                        <hr className='pb-3 mx-5' />
                        <p>{user.paypal.paypalEmail}</p>
                        <p>{user.sName}</p>
                        <p>{user.paypal.country}</p>
                        <p>{user.paypal.currency}</p>
                    </div>
                </div>
            </div>
        }

        {user.bank &&
            <div className='flip-box mt-20'>
                <div className="flip-box-inner mt-10 cursor-pointer bg-gradient-to-r from-orange-800 to-orange-400 text-white px-5 w-1/2 py-5 ">
                    <div className="flip-box-front flex justify-center items-center">
                        <BsBank className='text-9xl'/>
                    </div>
                    <div className="flip-box-back">
                        <p className='pt-5 pb-1'>BANK ACCOUNT DETAILS</p>
                        <hr className='pb-3 mx-5' />
                        <p>{user.bank.beneficiaryName}</p>
                        <p>{user.bank.beneficiaryCountry}</p>
                        <p>{user.bank.bankName}</p>
                        <p>***********{user.bank.accountNumber.substr(-4, 4)}</p>
                    </div>
                </div>
            </div>
        }
        </div>
        
        </div>
        </div>    
    </>
  )
}

export default Payment