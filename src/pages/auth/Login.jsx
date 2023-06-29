import React, { useEffect } from 'react'
import Hero from '../../components/Hero'
import LoginCard from '../../components/LoginCard'
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";

const Login = () => {
    // const navigate = useNavigate();

    // useEffect(() => {
    //     const token = Cookies.get('token');
    //     if (token) {
    //         navigate('/home')
    //     }
    // }, [])


    return (
        <div className='flex flex-col md:flex-row flex-shrink-0 items-center justify-center min-h-screen font-poppins'>
            <div>
                {/* create hero to tell reviewers */}
                <Hero />
            </div>
            <div>
                {/* create login card */}
                <LoginCard />
            </div>
        </div>
    )
}

export default Login