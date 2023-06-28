import React from 'react'

const AddButton = ({ click }) => {
    return (
        <div >
            <a onClick={(e) => { e.preventDefault(); click() }} className='bg-[#3C37FF] p-3 w-32 md:w-fit text-white rounded-md hover:bg-[#2c25f1] text-[12px] duration-200 font-poppins' href="">Tambah Barang</a>
        </div>
    )
}

export default AddButton