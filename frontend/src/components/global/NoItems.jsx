import React from 'react'
import Image from 'next/image'
import img from '../../assets/noitem.png'

const NoItems = () => {
  return (
    <div className='w-full flex justify-center relative mb-[100px]'>
        <div className='flex flex-col items-center justify-center w-full mt-4'>
          <Image src={img} width={380} height={350} alt='image' />
          <p className='font-rajdhani text-gray-100 text-[19px] mt-8'>NO NFTs FOUND</p>
          <p className='font-rajdhani text-gray-100 text-[22px] mt-2'>Get started with Sratch Marketplace</p>
        </div>
    </div>
  )
}

export default NoItems