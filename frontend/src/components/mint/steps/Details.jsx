"use client"
import React, { useContext } from 'react'
import { Context } from '@/app/context/Context'

const Details = () => {

  const { userData, setUserData } = useContext(Context)

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value})
  }

  return (
    <div className='w-full h-[550px] mt-6 border-gray-600 border-[0.5px]'>
        <div className='flex flex-col justify-center items-center w-full h-full'>
            <div className='w-[80%]'>
              <h2 className="block text-[22px] font-rajdhani font-normal" htmlFor="title">Title</h2>
              <p className="my-4 block text-[18px] font-rajdhani font-normal" htmlFor="title">Provide a clear and descriptive title of the Coupon (or) Voucher. This will help potential buyers understand what your Voucher is About.</p>
              <input className=" w-full bg-transparent w-full py-2 px-3 text-gray-200 leading-tight border-[3px] border-gray-500 text-[17px] font-playfair focus:border-[3.33px]" id="title" type="text"
                onChange={handleChange}
                name='title'
                value={userData["title"]}
              />
            </div>
            <div className='w-[80%] mt-8'>
              <h2 className="mt-4 block text-[22px] font-rajdhani font-normal" htmlFor="description">Description</h2>
              <p className="my-4 block text-[18px] font-rajdhani font-normal" htmlFor="description">Provide a detailed description of your Voucher. Explain what the voucher does, its intended applications, and how to redeem the Coupon (or) Voucher.</p>
              <textarea className=" w-full bg-transparent w-full py-2 px-3 text-gray-200 leading-tight border-[3px] border-gray-500 text-[17px] font-playfair focus:border-[3.33px]" id="description" rows="5" type="text"
                onChange={handleChange}
                name='description'
                value={userData["description"]}
              />
            </div>
        </div>
    </div>
  )
}

export default Details