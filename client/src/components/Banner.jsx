import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BannerImage from '../assets/BannerImage.svg';
import { AuthContext } from '../util/AuthContext';

const Banner = () => {
    const { authen, setAuthen } = useContext(AuthContext);
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [values, setValues] = useState({ email: '', password: '' });

    const navigate = useNavigate();

    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get(import.meta.env.VITE_REACT_APP_API_URL + `/`)
            .then(res => {
                if (res.data.Status === "Success") {
                    setAuth(true);
                    setName(res.data.name);
                } else {
                    setAuth(false);
                    setMessage(res.data.Error);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(import.meta.env.VITE_REACT_APP_API_URL +  `/login`, values)
            .then(res => {
                if (res.data.Status === "Success") {
                    setAuthen(true);
                    navigate('/book');
                } else {
                    alert(res.data.Error);
                }
            })
            .catch(err => console.log(err));
    };

    const handleDelete = () => {
        axios.get(import.meta.env.VITE_REACT_APP_API_URL +  `/logout`)
            .then(res => {       
                location.reload(true);  
                setAuth(false)
                setAuthen(false)
                navigate('/')
            })
            .catch(err => console.log(err));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    return (
        <div className='flex justify-between mx-auto'>
            <div className='w-1/2 my-auto'>
                {auth ? (
                    <div className='ml-6'>
                        <div className='text-[72px] font-bold'>Hi admin</div>
                        <div className='text-[24px] font-light my-1'>
                            Rushing to the bookstore, excitement builds, craving the stories waiting on shelves. Each book holds promise, beckoning with adventures, knowledge, and escape into worlds unknown
                        </div>
                        <br />
                        <button onClick={handleDelete} className='bg-black text-white px-12 py-2 text-[24px] rounded-full hover:scale-110 hover:duration-150 shadow-xl'>Log out</button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center mx-auto h-screen w-full">
                        <div className="w-2/3 rounded-[40px] ">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-semibold leading-tight tracking-tight text-black md:text-2xl lg:text-[40px] ">
                                    Sign in to your account
                                </h1>

                                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-[22px] font-medium text-black ">
                                            Your email
                                        </label>
                                        <input onChange={handleInputChange} type="email" name="email" id="email" className="bg-transparent border-2 border-black text-black sm:text-[22px] rounded-[20px] block w-full p-2.5 focus:outline-none " placeholder="name@company.com" required />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-[22px] font-medium text-black ">
                                            Password
                                        </label>
                                        <input onChange={handleInputChange} type="password" name="password" id="password" placeholder="••••••••" className="bg-transparent border-2 border-black text-black sm:text-[22px] rounded-[20px] focus:outline-none  block w-full p-2.5 " required />
                                    </div>
                                    <button type="submit" className="w-full text-white bg-black hover:bg-primary-700 focus:outline-none font-medium rounded-[20px] text-[22px] px-5 py-2.5 text-center  hover:scale-[102%] hover:duration-150 shadow-lg">
                                        Sign in
                                    </button>
                                    <p className="text-[22px] font-light text-gray-500">
                                        Don’t have an account yet?
                                        <Link to="/register" className="font-medium text-black hover:underline ml-1">
                                            Sign up
                                        </Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className='w-1/2'>
                {auth ? (
                    <div className='mt-10 flex justify-end'>
                        <img className=' w-9/12' src={BannerImage} alt="" />
                    </div>
                ) : (
                    <div className='h-screen flex items-center mx-auto'>
                        <img className=' w-10/12' src={BannerImage} alt="" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Banner;
