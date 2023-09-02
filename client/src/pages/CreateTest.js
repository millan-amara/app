import React, { useState } from 'react';
import axios from 'axios';

function CreateTest() {
    const [formData, setFormData] = useState({
        
        question: '',
        optionOne: '',
        optionTwo: '',
        optionThree: '',
        optionFour: '',
    })

    const { question,optionOne,optionTwo,optionThree,optionFour } = formData;

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('/language', formData)
    }
    
    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div className='w-3/4'>
                <div className='mb-5'>
                    <label htmlFor="question">Question</label>
                    <input 
                        type="text" 
                        value={question}
                        id='question'
                        className="mt-1 focus:ring-2 focus:outline-none appearance-none w-full text-lg leading-6 text-slate-900 rounded-md py-2 pl-2 ring-1 ring-green-700 shadow-sm" 
                        onChange={handleChange}
                    />
                </div>
                <div>
                <input 
                    className="mt-3 focus:ring-2 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm" 
                    type="text" value={optionOne} id='optionOne' onChange={handleChange}
                />
                <input 
                    className="mt-3 focus:ring-2 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm" 
                    type="text" value={optionTwo} id='optionTwo' onChange={handleChange}
                />
                <input 
                    className="mt-3 focus:ring-2 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm" 
                    type="text" value={optionThree} id='optionThree' onChange={handleChange}
                />
                <input 
                    className="mt-3 focus:ring-2 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm" 
                    type="text" value={optionFour} id='optionFour' onChange={handleChange}
                />
                </div>
            </div>

            <button className='bg-gradient-to-r from-slate-600 to-slate-800 text-white w-3/4 py-2 rounded-md mt-4'>Submit</button>
        </form>
        
    </div>
  )
}

export default CreateTest;