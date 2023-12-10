import Image from 'next/image'
import React from 'react'
import { useState, useEffect } from 'react'
import Link from "next/link"


const Card = ({object}) => {

  const [nft, setNft] = useState({}) 

  useEffect(() => {
    setNft(object)
    console.log(nft)
  }, [object])

  return (
    <div>
        <Link href={{pathname: '/nft_details',
            query: {
              Id: nft.Id,
              Seller: nft.Seller,
              Price: nft.Price,
              Title: nft.Title,
              Description: nft.Description,
              Cover: nft.Cover,
              Terms: nft.Terms,
              From: nft.From,
              To: nft.To,
              UUID: nft.UUID,  
              Buyer: nft.Buyer,
            }
        }}>

        <div className='bg-transparent rounded-[5px] shadow-sm border-[1px] border-gray-700 sm:mt-2 relative group'>
            <div className='w-full flex justify-center h-[350px]'>
                <Image src={nft.Cover} width={380} height={350} alt='image' className='object-cover rounded-[5px] nextimg'/>
            </div>
            <div className='absolute z-[2] bg-[black] w-full h-[130px] bottom-[0px] rounded-b-[5px] bg-opacity-80 backdrop-blur-sm p-4 group-hover:h-[350px] group-hover:rounded-[5px] transition-all duration-300'>
                <h2 className='font-rajdhani text-[28px] text-gray-100'>{nft.Title}</h2>
            </div>
        </div>
        </Link>
    </div>
  )
}

export default Card