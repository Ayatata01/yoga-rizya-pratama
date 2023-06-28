import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { setBarangAction } from '../reducers/actions';
import Cookies from 'js-cookie';
import axios from 'axios';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

const Search = () => {
    const [search, setSearch] = useState()
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();

    const fetchData = async () => {
        setLoading(true)
        try {
            const url = `https://cloudy-celestial-mojoceratops.glitch.me/barang?search=${search}`
            const token = Cookies.get('token');
            const response = await axios.get(url, {
                headers: {
                    Authorization: `bearer ${token}`
                }
            });
            dispatch(setBarangAction(response));
            setLoading(false);
            setSearch('');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='flex flex-row items-center'>
            <span onClick={() => {
                fetchData();
            }} className='flex flex-row items-center gap-2 mr-3 cursor-pointer group'><ArrowPathIcon className='w-3 h-3 text-green-500' /> <p className='text-[14px] group-hover:font-semibold'>refresh</p></span>
            <input onChange={(e) => {
                setSearch(e.target.value);
            }} className='outline-none border-[2px] rounded-l-md px-3 py-1 border-[#7671ff] text-[14px] font-semibold placeholder:font-thin bg-transparent' type="text" placeholder='cari barang...' value={search} />
            <button onClick={() => fetchData()} className='bg-[#3C37FF] px-3 py-2 w-fit text-white rounded-r-md hover:bg-[#2c25f1] text-[14px] duration-200 font-poppins'>{loading ? 'Loading...' : 'Cari'}</button>
        </div>
    )
}

export default Search