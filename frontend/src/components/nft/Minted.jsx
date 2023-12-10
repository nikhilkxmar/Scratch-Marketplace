import Image from 'next/image'
import React from 'react'
import { useState, useEffect } from 'react'
import {IoPricetagsOutline} from 'react-icons/io5'


const Minted = ({object}) => {

  const [nft, setNft] = useState({}) 

  useEffect(() => {
    setNft(object)
    console.log(nft)
  }, [object])

  return (
    <div>
        <div className='bg-transparent rounded-[5px] shadow-sm border-[1px] border-gray-700 sm:mt-2 relative group'>
            <div className='font-rajdhani text-[20px] text-gray-100 h-[30px] w-[30px] rotate-45 absolute z-[3] top-[15px] left-[15px] bg-black bg-opacity-80 text-center border-[1px] border-neutral-700'><p className='rotate-[315deg]'>{nft.Id}</p></div>
            <div className='w-full flex justify-center h-[350px]'>
                <Image src={nft.Cover} width={380} height={350} alt='image' className='object-cover rounded-[5px] nextimg'/>
            </div>
            <div className='absolute z-[2] bg-[black] w-full h-[130px] bottom-[0px] rounded-b-[5px] bg-opacity-80 backdrop-blur-sm p-4 h-[350px] rounded-[5px]'>
                <div className='mb-[40px] absolute bottom-[0px]'>
                    <h2 className='font-rajdhani text-[28px] text-gray-100 '>{nft.Title}</h2>
                    <div className='flex jsutify-center items-center mt-[10px]'>
                        <IoPricetagsOutline className='text-4xl w-[22px] h-[22px] text-gray-300' />
                        <p className='font-rajdhani text-gray-100 text-[20px] ml-[10px]'>
                            {Number(nft.Price)/10**18} XRPL
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Minted