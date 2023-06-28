import React, { useState, useRef } from 'react'
import Input from './Input';
import axios from 'axios';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { setBarangAction } from '../reducers/actions';

const FormUpdateBarang = ({ barang, close }) => {
    const fileInputRef = useRef(null);
    const dispatch = useDispatch();
    const [selectedImage, setSelectedImage] = useState(`https://cloudy-celestial-mojoceratops.glitch.me/${barang.foto_barang}`);
    const [loading, setLoading] = useState(false);
    const [serverErrors, setServerErrors] = useState();
    const [formData, setFormData] = useState({
        nama_barang: barang.nama_barang,
        harga_beli: barang.harga_beli,
        harga_jual: barang.harga_jual,
        stok: barang.stok,
        image: '',
    });
    const [errors, setErrors] = useState({
        nama_barang: '',
        harga_beli: '',
        harga_jual: '',
        stok: '',
        image: '',
    });
    const token = Cookies.get('token');

    const handleButtonClick = (e) => {
        e.preventDefault()
        fileInputRef.current.click();
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
            setFormData({ ...formData, image: file });
            setErrors({ ...errors, image: '' });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const fetchData = async () => {
        try {
            const token = Cookies.get('token');
            const response = await axios.get('https://cloudy-celestial-mojoceratops.glitch.me/barang', {
                headers: {
                    Authorization: `bearer ${token}`
                }
            });
            dispatch(setBarangAction(response));
        } catch (error) {
            console.log(error);
        }
    };

    const validateForm = () => {
        let isValid = true;
        const { nama_barang, harga_beli, harga_jual, stok, image } = formData;
        const maxSizeKB = 100;

        if (!nama_barang) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                nama_barang: 'Nama barang harus diisi.',
            }));
            isValid = false;
        }

        if (!harga_beli) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                harga_beli: 'Harga beli harus diisi.',
            }));
            isValid = false;
        }

        if (!harga_jual) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                harga_jual: 'Harga jual harus diisi.',
            }));
            isValid = false;
        }

        if (!stok) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                stok: 'Stok harus diisi.',
            }));
            isValid = false;
        }


        if (isNaN(Number(harga_beli))) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                harga_beli: 'Harga beli harus angka.',
            }));
            isValid = false;
        }

        if (isNaN(Number(harga_jual))) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                harga_jual: 'Harga jual harus angka.',
            }));
            isValid = false;
        }

        if (isNaN(Number(stok))) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                stok: 'Stok harus angka.',
            }));
            isValid = false;
        }

        if (image && image.size > maxSizeKB * 1024) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                image: `Ukuran gambar tidak boleh melebihi ${maxSizeKB} KB.`,
            }));
            isValid = false;
        }

        const allowedExtensions = ['.jpg', '.jpeg', '.png'];
        const fileExtension = image && image.name.substring(image.name.lastIndexOf('.')).toLowerCase();
        if (image && !allowedExtensions.includes(fileExtension)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                image: 'Format gambar harus JPG atau PNG.',
            }));
            isValid = false;
        }

        return isValid;
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setLoading(true);
            const postData = new FormData();
            postData.append('nama_barang', formData.nama_barang);
            postData.append('harga_beli', formData.harga_beli);
            postData.append('harga_jual', formData.harga_jual);
            postData.append('stok', formData.stok);
            postData.append('image', formData.image);

            axios
                .patch(`https://cloudy-celestial-mojoceratops.glitch.me/barang/${barang._id}`, postData, {
                    headers: {
                        Authorization: `bearer ${token}`
                    }
                })
                .then((response) => {
                    console.log('Response:', response.data);
                    setFormData({
                        nama_barang: '',
                        harga_beli: '',
                        harga_jual: '',
                        stok: '',
                        image: null,
                    });
                    setSelectedImage(null);
                    setLoading(false);
                    toast.success('Barang berhasil dirubah!');
                    fetchData();
                    close();
                })
                .catch((error) => {
                    const err = error.response.data;
                    console.error('Error:', error.response.data);
                    setServerErrors(err.msg);
                    setLoading(false);
                });
        }
    };

    return (
        <div className='w-[30rem] relative'>
            <Toaster />
            <h2 className="text-[15px] font-bold mb-4">Edit Barang</h2>
            {serverErrors && <p className="text-red-500 text-[14px]">{serverErrors}</p>}
            <form onSubmit={handleSubmit}>
                <Input title={'Nama barang'} name={'nama_barang'} type={'text'} change={(e) => handleInputChange(e)} value={formData.nama_barang} />
                {errors.nama_barang && <p className="text-red-500 text-[14px]">{errors.nama_barang}</p>}
                <Input title={'Harga beli'} name={'harga_beli'} type={'number'} change={(e) => handleInputChange(e)} value={formData.harga_beli} />
                {errors.harga_beli && <p className="text-red-500 text-[14px]">{errors.harga_beli}</p>}
                <Input title={'Harga jual'} name={'harga_jual'} type={'number'} change={(e) => handleInputChange(e)} value={formData.harga_jual} />
                {errors.harga_jual && <p className="text-red-500 text-[14px]">{errors.harga_jual}</p>}
                <Input title={'Stok'} name={'stok'} type={'number'} change={(e) => handleInputChange(e)} value={formData.stok} />
                {errors.stok && <p className="text-red-500 text-[14px]">{errors.stok}</p>}

                <div className='flex flex-col gap-3 mb-3'>
                    <label className='text-[15px] text-gray-500'>Foto barang</label>
                    <input onChange={handleFileInputChange} ref={fileInputRef} className='hidden' type="file" name="image" accept="image/*" />
                    <button
                        className="px-3 py-2 border-[2px] rounded-md text-[15px] font-semibold text-gray-600 bg-transparent"
                        onClick={handleButtonClick}
                    >
                        Upload Gambar
                    </button>
                    {errors.image && <p className="text-red-500 text-[14px]">{errors.image}</p>}
                    {selectedImage && (
                        <img src={selectedImage} alt="Selected" className="mt-3 w-full h-[10rem] object-contain" style={{ maxWidth: '100%' }} />
                    )}
                </div>
                <button className='bg-[#3C37FF] p-3 w-full text-white rounded-md hover:bg-[#2c25f1] text-[12px] duration-200 font-poppins mt-3'>{loading ? 'Loading...' : 'Simpan'}</button>
            </form>
        </div>
    )
}

export default FormUpdateBarang