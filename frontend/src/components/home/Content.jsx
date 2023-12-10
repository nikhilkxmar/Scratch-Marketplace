import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import flow from '../../assets/flow.png'
import Link from 'next/link'
import Button from '../navigation/Button'

const Content = () => {
  return (
        <div className='w-full mt-[175px] flex justify-center relative mb-[150px]'>
        <div className="border-[1px] border-neutral-400 absolute w-[10px] h-[10px] rounded-full right-[66px] top-[-140px] bg-gray-400 z-[1]"></div>
        <div className="border-[1px] border-neutral-400 absolute h-[500px] right-[70px] bottom-[0px]"></div>
        <div className="border-[1px] border-neutral-400 absolute w-[50px] right-[70px] bottom-[0px]"></div>
        <div className="border-[1px] border-neutral-400 absolute w-[10px] h-[10px] rounded-full right-[120px] bottom-[-4px] bg-neutral-400 z-[1]"></div>

        <div className="absolute top-[0px] left-[0px] w-[25%] h-[200px] pink__gradient z-[-1]"></div>
        <div className="absolute top-[-50px] right-[150px] w-[40%] h-[350px] blue__gradient z-[-1]"></div>

        <div className='flex justify-between items-center w-[90%]'>
            <motion.div className='w-[43%] mx-4 flex flex-col justify-start relative h-[350px] mt-4'
                initial={{x:-80, opacity:0}}
                whileInView={{x:0, opacity:1}}
                exit={{opacity:0}}
                transition={{duration:0.4, delay:0.4}}>
                <Image src={flow} layout='fill' alt="image" className='z-[-1] rounded-[10px]  border-[1px] border-neutral-700'/>
            </motion.div>

            <motion.div className='w-[52%] mx-4 flex flex-col justify-center items-start'>
                <motion.h2 className='text-gray-100 font-rajdhani text-[45px] ml-2 mr-[100px]'
                    initial={{x:80, opacity:0}}
                    whileInView={{x:0, opacity:1}}
                    exit={{opacity:0}}
                    transition={{duration:0.4, delay:0.4}}>
                    Interested to Learn more <br /> about Scratch ?
                </motion.h2>
                <motion.p className='text-gray-300 font-rajdhani text-[20px] ml-2 mt-4 mr-[100px]'
                    initial={{x:0, opacity:0}}
                    whileInView={{x:0, opacity:1}}
                    exit={{opacity:0}}
                    transition={{duration:0.4, delay:0.6}}>
                    {'Curious about our applications inner workings and consensus mechanisms? Explore our GitHub repository for a transparent look into the codebase and architecture. Contribute, collaborate, and unlock the future of decentralized commerce.'}
                </motion.p>
                <motion.div initial={{y:0, opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.5, delay:0.6}} className='mt-[20px]'>
                    <Link href="https://github.com/nikhilkxmar/Scratch-Marketplace" target='blank'><Button tag={"Github ➜"} height={"py-[14px]"} /></Link>
                </motion.div>
            </motion.div>
        </div>
    </div>
  )
}

export default Content