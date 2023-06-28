import React from 'react'
import { motion } from "framer-motion";

const Hero = () => {
    return (
        <motion.div initial={{
            x: -100,
            opacity: 0,
        }}
            whileInView={{
                x: 0,
                opacity: 1,
            }}
            transition={{
                duration: 1.2,
            }}
            className='bg-[#3C37FF] min-w-fit md:w-[32rem] md:h-[40rem] py-6 px-10 md:rounded-xl text-white'>
            <span className='tracking-widest'>Yoga Rizya Pratama</span>
            <div className='mt-10 md:mt-20'>
                <span className='text-[40px] font-semibold'>Frontend Test</span>
                <p className='text-white/75 font-thin'>Dikarenakan di dalam soal tes terdapat proses CRUD dan penggunaan JWT, oleh karena itu saya membuat api sederhana dengan node js dan mengintregasikan dengan sisi frontend</p>
            </div>
            <div className='bg-[#2520E3] mt-10 md:mt-[10rem] p-6 rounded-2xl flex flex-col'>
                <p className='text-[15px]'>Dokumentasi api postman dapat dilihat dengan mengklik tombol dibawah!</p>
                <a className='bg-[#3C37FF] p-3 w-fit mt-6 rounded-md hover:bg-[#2c25f1] text-[12px] duration-200' href="">Dokumentasi</a>
            </div>
        </motion.div>
    )
}

export default Hero