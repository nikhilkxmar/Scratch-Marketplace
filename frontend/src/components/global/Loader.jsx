import React from 'react'
import Image from 'next/image'
import img from '../../assets/loader.gif'

const Loader = () => {
  return (
    <div className='w-full h-[80vh] flex justify-center items-start relative'>
        <Image src={img} width={200} height={370} alt='image' className='object-fit'/>
    </div>
  )
}

export default Loader