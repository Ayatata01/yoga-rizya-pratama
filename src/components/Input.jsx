import React from 'react'

const Input = ({ title, change, name, type, value }) => {
    return (
        <div className='flex flex-col gap-3 mb-3'>
            <label className='text-[15px] text-gray-500'>{title}</label>
            <input onChange={change} className='px-3 py-2 border-[2px] rounded-md text-[15px] font-semibold text-gray-600 bg-transparent' type={type} name={name} value={value} />
        </div>
    )
}

export default Input