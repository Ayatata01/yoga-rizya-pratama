import React, { useState } from 'react';
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import Modal from './Modal';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch } from "react-redux";
import { setBarangAction } from '../reducers/actions';
import toast, { Toaster } from 'react-hot-toast';
import FormUpdateBarang from './FormUpdateBarang';

function formatMoney(number) {
    const factor = 1000;
    const units = ['', 'k', 'M', 'B', 'T']; // Akhiran untuk ribuan, jutaan, miliar, triliun, dst.

    let unitIndex = 0;
    while (number >= factor) {
        number /= factor;
        unitIndex++;
    }

    return number.toLocaleString() + units[unitIndex];
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const BarangCard = ({ barang }) => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenForm, setIsOpenForm] = useState(false);
    const [Loading, setLoading] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModalForm = () => {
        setIsOpenForm(true);
    };

    const closeModalForm = () => {
        setIsOpenForm(false);
    };

    const fetchData = async () => {
        try {
            const token = Cookies.get('token');
            const response = await axios.get(`https://cloudy-celestial-mojoceratops.glitch.me/barang`, {
                headers: {
                    Authorization: `bearer ${token}`
                }
            });
            dispatch(setBarangAction(response));
        } catch (error) {
            console.log(error);
        }
    };

    const deleteBarang = async (id) => {
        setLoading(true);
        try {
            const token = Cookies.get('token');
            const response = await axios.delete(`https://cloudy-celestial-mojoceratops.glitch.me/barang/${id}`, {
                headers: {
                    Authorization: `bearer ${token}`
                }
            })
            closeModal();
            fetchData();
            toast.success('Berhasil Menghapus Barang!')
            setLoading(false);
        } catch (error) {
            console.log(error.response.data)
        }
    }

    return (
        <div className='border-2 rounded-md group overflow-hidden relative'>
            <Toaster />
            <div className='relative w-full h-56'>
                <img className='object-fill h-full w-full' src={`https://cloudy-celestial-mojoceratops.glitch.me/${barang.foto_barang}`} alt="foto barang" />
            </div>

            <div className='p-6 bg-white'>
                <p className="font-semibold text-lg">{capitalizeFirstLetter(barang.nama_barang)}</p>
                <div className="mt-4 flex items-center justify-between space-x-2">
                    <div>
                        <p className="text-gray-500">Harga Beli</p>
                        <p className="text-lg font-semibold">
                            {formatMoney(barang.harga_beli)}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-500">Harga Jual</p>
                        <p className="text-lg font-semibold">
                            {formatMoney(barang.harga_jual)}
                        </p>
                    </div>
                </div>
                <div className='flex flex-row justify-between items-center'>
                    <div>
                        <p className="text-gray-500 mt-3">Stok</p>
                        <p className="text-lg font-semibold">
                            {barang.stok}
                        </p>
                    </div>
                    <div className='flex flex-row gap-5'>
                        <TrashIcon onClick={openModal} className='w-5 h-5 text-red-500 cursor-pointer' />
                        <Modal isOpen={isOpen} onClose={closeModal}>
                            <div className='w-[20rem]'>
                                <p className='text-[14px] font-semibold '>Apakah anda akan menghapus barang {barang.nama_barang} ?</p>
                                <div className='flex flex-row justify-end gap-2 mt-3 font-semibold text-[14px]'>
                                    <button onClick={closeModal} className='border-[2px] border-red-600 p-2 rounded-xl hover:bg-red-600 hover:text-white duration-200'>Tidak</button>
                                    <button onClick={() => deleteBarang(barang._id)} className='border-[2px] border-[#3C37FF] p-2 rounded-xl hover:bg-[#3C37FF] hover:text-white duration-200'>{Loading ? 'wait...' : 'Iya'}</button>
                                </div>
                            </div>
                        </Modal>
                        <PencilSquareIcon onClick={openModalForm} className='w-5 h-5 text-[#3C37FF] cursor-pointer' />
                        <Modal isOpen={isOpenForm} onClose={closeModalForm}>
                            <FormUpdateBarang barang={barang} close={() => closeModalForm()} />
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BarangCard