import React from 'react'
import {AiFillGithub} from 'react-icons/ai'
import {AiOutlineInstagram} from 'react-icons/ai'

const Footer = () => {
  return (
    <div className='w-full px-12 py-[20px] mt-[150px] opacity-70 border-t-[1px] border-b-[1px] border-gray-700' style={{ backgroundImage: "url(/footer.jpg)", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
        <div className='flex justify-between items-center rounded-lg mb-4'>
            <div className='text-white font-rajdhani text-[18px]'>©Copyright 2023. All Rights Reserved</div>
            <div className='flex gap-x-4'>
                <div className='cursor-pointer'><a href='https://github.com/nikhilkxmar' target='blank'><AiFillGithub className='text-4xl w-[35px] h-[35px] p-[4px] rounded-full border-[1px] border-[#fff] text-gray-100 group border-gray-600' /></a></div>
                <div className='cursor-pointer'><a href='https://github.com/nikhilkxmar' target='blank'><AiOutlineInstagram className='text-4xl w-[35px] h-[35px] p-[4px] rounded-full border-[1px] border-[#fff] text-gray-100 group border-gray-600'/></a></div>
            </div>
        </div>
    </div>
  )
}

export default Footer