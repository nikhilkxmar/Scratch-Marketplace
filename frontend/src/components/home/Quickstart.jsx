import React from 'react'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import {AiOutlineArrowUp} from 'react-icons/ai'
import {AiOutlineArrowRight} from 'react-icons/ai'
import { motion } from 'framer-motion'

const container = {
    show:{
        transition:{
            staggerChildren:0.25
        }
    }
}

const Quickstart = () => {
  return (
    <div className='mt-[100px] relative'>
        <div className="absolute top-[200px] left-[300px] w-[60%] h-[35%] blue__gradient z-[-1]"></div>
        <div className='max-w-[1240px] mx-auto text-gray-100 relative'>
          <div className='px-4'>
              <h2 className='text-[45px] pt-12 text-gray-100 font-rajdhani text-center' >{'Traverse'}</h2>
              <h3 className='text-[22px] pt-2 text-gray-300 text-center font-rajdhani'>{'Unlock the Future of E-Vouchers – Where Innovation Meets Security'}</h3>
          </div>

          <motion.div className='grid grid-cols-1 lg:grid-cols-3 gap-x-8 px-4 text-black overflow-hidden'>
              <motion.div className='bg-transparent rounded-[5px] shadow-sm border-[1px] border-gray-700 sm:mt-10'
                initial={{x:-80, opacity:0}}
                whileInView={{x:0, opacity:1}}
                exit={{opacity:0}}
                transition={{duration:0.5, delay:0.5}}>
                  <div className='p-4 pb-8'>
                    <div className='w-full flex justify-center'>
                        <AiOutlineArrowLeft className='text-4xl w-[50px] h-[50px] text-white' />
                    </div>
                    <h3 className='font-medium font-rajdhani text-[27px] text-gray-100 my-6 text-center'>{'Connect'}</h3>
                      <p className='text-gray-300 font-rajdhani text-[21px] text-center'>{'When youre ready to dive into Sratch marketplace, you will want to connect your MetaMask wallet. This step ensures you can access all the incredible features seamlessly and securely. Lets get you connected and ready to explore.'}</p>
                  </div>
              </motion.div>
              <motion.div className='bg-transparent rounded-[5px] shadow-sm border-[1px] border-gray-700 sm:mt-10'
                initial={{y:-30, opacity:0}}
                whileInView={{y:0, opacity:1}}
                exit={{opacity:0}}
                transition={{duration:0.4, delay:0.4}}>
                  <div className='p-4 pb-8'>
                    <div className='w-full flex justify-center'>
                        <AiOutlineArrowUp className='text-4xl w-[50px] h-[50px] text-white' />
                    </div>
                    <h3 className='font-medium font-rajdhani text-[27px] text-gray-100 my-6 text-center'>{'Store'}</h3>
                      <p className='text-gray-300 font-rajdhani text-[21px] text-center'>{'Your journey to finding the perfect Vouchers begins here. Discover how to buy E-Vouchers with confidence, knowing your privacy and security are our top priorities. Explore the diverse range of Vouchers and Coupon cards and make your selections.'}</p>
                  </div>
              </motion.div>
              <motion.div className='bg-transparent rounded-[5px] shadow-sm border-[1px] border-gray-700 sm:mt-10'
                initial={{x:80, opacity:0}}
                whileInView={{x:0, opacity:1}}
                exit={{opacity:0}}
                transition={{duration:0.5, delay:0.5}}>
                  <div className='p-4 pb-8'>
                    <div className='w-full flex justify-center'>
                        <AiOutlineArrowRight className='text-4xl w-[50px] h-[50px] text-white' />
                    </div>
                    <h3 className='font-medium font-rajdhani text-[27px] text-gray-100 my-6 text-center'>{'Create'}</h3>
                      <p className='text-gray-300 font-rajdhani text-[21px] text-center'>{'If you want to sell your E-Vouchers and coupon cards and your looking to share your collection with the world, this is your guide to minting and listing your models on our open market. You can set your desired price and sell your Vouchers as NFTs'}</p>
                  </div>
              </motion.div>
          </motion.div>
      </div>
    </div>
  )
}

export default Quickstart