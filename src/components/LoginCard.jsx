import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { motion } from "framer-motion";

const LoginCard = () => {
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('admin123');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();

        try {
            const response = await axios.post('https://cloudy-celestial-mojoceratops.glitch.me/auth/login', {
                username: username,
                password: password,
            });

            Cookies.set('token', response.data.jwt);

            navigate('/home')
            setLoading(false)
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <motion.div initial={{
            x: 100,
            opacity: 0,
        }}
            whileInView={{
                x: 0,
                opacity: 1,
            }}
            transition={{
                duration: 1.2,
            }}
            className='md:w-[32rem] md:h-[40rem] p-6 md:p-14'>
            <span className='text-2xl font-semibold'>Login</span>
            <div className='mt-6 bg-[#3C37FF] text-white p-3 rounded-md shadow'>
                <p className='text-[12px] '>Login digunakan untuk dapat menggunakan JWT, isikan username dengan admin dan password admin123 atau bisa tekan tombol sign in secara langsung</p>
            </div>
            <div className='mt-6 md:mt-14'>
                <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-3'>
                        <label className='text-[15px] text-gray-500'>Username</label>
                        <input onChange={(e) => setUsername(e.target.value)} className='px-3 py-2 border-[2px] rounded-md text-[15px] font-semibold text-gray-600 bg-transparent' type="text" name="username" value={username} />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label className='text-[15px] text-gray-500'>Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} className='px-3 py-2 border-[2px] rounded-md text-[15px] font-semibold text-gray-600 bg-transparent' type="password" name="password" value={password} />
                    </div>
                    <button className='bg-[#3C37FF] p-3 w-full md:w-[10rem] mt-6 rounded-md hover:bg-[#2c25f1] text-[12px] duration-200 text-white'>{loading ? 'Loading...' : 'Sign in'}</button>
                </form>
            </div>
        </motion.div>
    )
}

export default LoginCard