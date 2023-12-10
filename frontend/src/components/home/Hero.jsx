"use client"
import React from 'react'
import Button from '../navigation/Button'
import { Typewriter  } from 'react-simple-typewriter'
import Link from 'next/link'
import { motion } from 'framer-motion'


const Hero = () => {
  return (
    <div className='w-full mt-[175px] flex justify-center'>
        <div className='flex justify-between items-center w-[90%]'>
            <div className='w-[52%] pl-8 mx-4 flex flex-col justify-center items-start'>
                <motion.h2 className='text-gray-100 font-rajdhani text-[45px] ml-2' initial={{y:-80, opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.5, delay:0.6}}>Secure Marketplace for Coupons & E-Vouchers</motion.h2>
                <motion.p className='text-gray-300 font-rajdhani text-[20px] ml-2 mt-2' initial={{y:-0, opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.5, delay:0.6}}>Welcome to Scratch, your gateway to a decentralized marketplace for buying and selling coupon cards and vouchers as NFTs! Empowering users with the freedom to transact securely and seamlessly, Scratch is an application designed to redefine your E-voucher experience.</motion.p>

                <div className='flex justify-start items-center mt-8'>  
                    <motion.div initial={{y:-40, opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.5, delay:0.6}}>
                      <Link href="/store"><Button tag={"Store"}/></Link>
                    </motion.div>
                    <motion.div initial={{y:40, opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.5, delay:0.6}}>
                      <Link href="/create"><Button tag={"Create"}/></Link>
                    </motion.div>
                </div>
            </div>

            <motion.div className='w-[43%] pr-8 mx-4 flex flex-col justify-start'>
                <motion.video src='/loop.mp4' autoPlay muted loop className='w-[98%] shadow-2xl rounded' initial={{x:50, opacity:0}} animate={{x:0,opacity:1}} transition={{duration:0.5, delay:0.8}}/>
                <motion.div className='w-[98%] h-[75px] border-[1px] border-gray-700 mt-4 rounded flex items-center shadow-xl' initial={{x:0, opacity:0}} animate={{x:0,opacity:1}} transition={{duration:0.5, delay:0.5}}>
                    <span className='text-[18px] font-rajdhani text-gray-100'>
                        <span className='mx-2'>{'>>'}</span>
                        <Typewriter
                            words={['Connect your wallet', 'Purchase vouchers & gift cards as NFTs', 'Sell your E-vouchers at Scratch', 'Secure market for trading', 'Get secure and private Redeem codes']}
                            loop={50}
                            cursor
                            cursorStyle='_'
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1000}
                        />
                    </span> 
                </motion.div>
            </motion.div>
        </div>
    </div>
  )
}

export default Hero