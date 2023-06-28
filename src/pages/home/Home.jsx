import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import BarangCard from '../../components/BarangCard';
import AddButton from '../../components/AddButton';
import Search from '../../components/Search';
import Modal from '../../components/Modal';
import FormBarang from '../../components/FormBarang';
import { useSelector, useDispatch } from "react-redux";
import { setBarangAction } from '../../reducers/actions';
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

const Home = () => {
    const dispatch = useDispatch();
    const barangs = useSelector((state) => state.barangs)
    const [pages, setPages] = useState(1)

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const fetchData = async () => {
        try {
            const token = Cookies.get('token');
            const response = await axios.get(`https://cloudy-celestial-mojoceratops.glitch.me/barang?page=${pages}`, {
                headers: {
                    Authorization: `bearer ${token}`
                }
            });
            dispatch(setBarangAction(response));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData()
    }, [pages])

    return (
        <div className='container xl:max-w-screen-xl mx-auto py-12 px-6 font-poppins min-h-screen relative'>
            {/* create search and add barang */}
            <div className='flex flex-col gap-6 md:gap-0 md:flex-row justify-between items-center'>
                <AddButton click={openModal} />
                <Modal isOpen={isOpen} onClose={closeModal}>
                    <FormBarang />
                </Modal>
                <Search />

            </div>
            {/* create card barang */}
            <div className='mt-10 grid gap-8 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1'>
                {
                    barangs?.data?.data.map((barang, index) => (
                        <BarangCard barang={barang} key={index} />
                    ))
                }
            </div>
            {/* create pagination */}
            <div className='mt-6 w-full'>
                <hr />
                <div className='flex flex-col gap-2 text-[12px] font-medium mt-6'>
                    <span>Page : {barangs?.data.page} </span>
                    <span>Total Page : {barangs?.data.totalPages} </span>
                    <span>Per Page : {barangs?.data.limit} </span>
                    <span>Total Barang : {barangs?.data.totalBarangs}</span>
                </div>
                <div className='flex items-center mt-6 gap-3'>
                    <button
                        disabled={pages <= 1}
                        onClick={() => setPages(pages - 1)}
                        className='p-1 rounded-md hover:bg-rose-100 bg-rose-300 hover:text-rose-500'
                    >
                        <MinusSmallIcon className='w-6 h-6 flex-shrink-0' />
                    </button>
                    <p className='font-semibold text-xl'>{pages}</p>
                    <button
                        onClick={() => setPages(pages + 1)}
                        className='p-1 rounded-md hover:bg-green-100 bg-green-300 hover:text-green-500'
                    >
                        <PlusSmallIcon className='w-6 h-6 flex-shrink-0' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Home