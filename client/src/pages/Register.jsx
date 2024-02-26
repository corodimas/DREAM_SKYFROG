import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {

  const navigate = useNavigate()

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    axios.post(import.meta.env.VITE_REACT_APP_API_URL +  `/register`, values)
      .then(res => {
        if (res.data.Status === "Success") {
          navigate('/')
        } else {
          alert("Error")
        }
      })
      .then(err => console.log(err))
  }

  return (
    <div className='flex justify-between mx-auto'>
      <div className='w-1/2 my-auto '>
        <div className="flex flex-col items-center justify-center mx-auto h-screen w-full">
          <div className="w-2/3 rounded-[40px] ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-semibold leading-tight tracking-tight text-black md:text-2xl lg:text-[40px] ">
                Create an account
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label htmlFor="text" className="block mb-2 text-[22px] font-medium text-gray-900">
                    Your name
                  </label>
                  <input onChange={e => setValues({ ...values, name: e.target.value })} type="text" name="name" id="name" className="bg-transparent border-2 border-black text-gray-900 sm:text-[22px] rounded-[20px] focus:outline-none block w-full p-2.5 " placeholder="name" required />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-[22px] font-medium text-gray-900">
                    Your email
                  </label>
                  <input onChange={e => setValues({ ...values, email: e.target.value })} type="email" name="email" id="email" className="bg-transparent border-2 border-black text-gray-900 sm:text-[22px] rounded-[20px] focus:outline-none block w-full p-2.5 " placeholder="name@company.com" required />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-[22px] font-medium text-gray-900">
                    Password
                  </label>
                  <input onChange={e => setValues({ ...values, password: e.target.value })} type="password" name="password" id="password" placeholder="••••••••" className="bg-transparent border-2 border-black text-gray-900 sm:text-[22px] rounded-[20px] focus:outline-none block w-full p-2.5 " required />
                </div>
                <button type="submit" className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none font-medium rounded-[20px] text-[22px] px-5 py-2.5 text-center ">
                  Create an account
                </button>
                <p className="text-[22px] font-light text-gray-500 ">
                  Already have an account?
                  <Link to="/" className="font-medium text-black hover:underline ml-2">
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className=' w-1/2'>
        <div className='h-screen flex items-center mx-auto'>
          <img className=' w-10/12' src="https://media.discordapp.net/attachments/696701068381257771/1211054021687644210/image.png?ex=65ecccf3&is=65da57f3&hm=43fa805e9a777084d456e59a060dbacc1787f765f73a5a5afef7d7742463d447&=&format=webp&quality=lossless&width=629&height=678" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Register;
