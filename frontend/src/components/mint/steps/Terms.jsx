"use client"
import React, { useContext } from 'react'
import { Context } from '@/app/context/Context'

const Terms = () => {

  const { userData, setUserData } = useContext(Context)

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value})
  }


  return (
    <div className='w-full h-[550px] mt-6 border-gray-600 border-[0.5px]'>
        <div className='flex flex-col justify-center items-center w-full h-full'>
            <div className='w-[80%]'>
              <h2 className="block text-[22px] font-rajdhani font-normal" htmlFor="value">NFT Listing Price</h2>
              <p className="my-4 block text-[18px] font-rajdhani font-normal" htmlFor="value">Provide a Price (in XRPL) at which you want to List your Coupon (or) Voucher to the global audience for sale on our Marketplace.</p>
              <div className='flex justify-start items-center'>
                <input className="w-[212px] bg-transparent w-full py-2 px-3 text-gray-200 leading-tight border-[3px] border-gray-500 text-[17px] font-playfair focus:border-[3.33px]" id="value" type="number" min="0" step={0.01}
                onChange={handleChange}
                name='value'
                value={undefined}
                />
                <p className="my-4 block text-[18px] font-rajdhani font-normal ml-4">XRPL</p>
              </div>
            </div>
            <div className='w-[80%] mt-8'>
              <h2 className="mt-4 block text-[22px] font-rajdhani font-normal" htmlFor="terms">Terms & Conditions</h2>
              <p className="my-4 block text-[18px] font-rajdhani font-normal" htmlFor="terms">Provide a detailed insight about the Terms & Conditions of your Coupon. Clearly Outline the Coupon (or) Vouchers usage rules, including restrictions and limitations.</p>
              <textarea className=" w-full bg-transparent w-full py-2 px-3 text-gray-200 leading-tight border-[3px] border-gray-500 text-[17px] font-playfair focus:border-[3.33px]" id="terms" rows="5" type="text"
                onChange={handleChange}
                name='terms'
                value={userData["terms"]}
              />
            </div>
        </div>
    </div>
  )
}

export default Terms