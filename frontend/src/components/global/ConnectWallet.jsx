import React from 'react'
import Image from 'next/image'
import img from '../../assets/connect.png'

const ConnectWallet = () => {
  return (
    <div className='w-full flex justify-center'>
        <div className='flex flex-col items-center justify-center w-full mb-4'>
          <Image src={img} width={380} height={350} alt='image' />
          <p className='font-rajdhani text-gray-100 text-[18px] mt-4'>DISCONNECTED WALLET</p>
          <p className='font-rajdhani text-gray-100 text-[22px] mt-2'>Connect Your Metamask Wallet</p>
        </div>
    </div>
  )
}

export default ConnectWallet