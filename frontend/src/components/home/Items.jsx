"use client"
import React, {useRef} from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import voucher from '../../assets/voucher1.png'
import nft from '../../assets/nft.jpg'
import secure from '../../assets/secure.jpg'
import blockchain from '../../assets/blockchain.jpg'


const Items = () => {

  const ref = useRef()
  const {scrollYProgress} = useScroll({target: ref})

  const y = useTransform(scrollYProgress, [0,1], ["0%", "100%"])

  return (
    <div className='flex justify-center pb-[50px]'>
    <div className='max-w-[1240px] mt-[20px]'>
        <section>
            <div className='flex justify-center items-center'>
            <div className='w-[400px] h-[300px] relative'>
                <Image src={nft} layout='fill' alt="image" className='z-[-1] rounded-[10px]' ref={ref} />
            </div>
            <motion.div className='flex flex-col w-[50%] ml-[50px] z-[-1]'
                initial={{y:0, opacity:0}}
                whileInView={{y:0, opacity:1}}
                exit={{opacity:0}}
                transition={{duration:0.4, delay:0.5}}>
                <h2 className='text-[30px] mb-4 text-md text-neutral-100 font-rajdhani'>Mint Vouchers & Coupons as NFTs</h2>
                <p className='text-[23px] text-neutral-200 font-rajdhani'>You can mint your E-Vouchers and gift coupons as ERC721 Non Fungible Tokens (NFT) hence making it a unique digital asset that can verify ownership and authenticity.  Go ahead to the create page, fill out all the details about your voucher. Finally enter the secret code which can be redeemed by the buyer and mint your voucher as NFT.</p>
            </motion.div>
            </div>
        </section>

        <section className='my-[150px]'>
            <div className='flex justify-center items-center'>
            <motion.div className='flex flex-col w-[50%] ml-[50px] z-[-1]' 
                initial={{y:0, opacity:0}}
                whileInView={{y:0, opacity:1}}
                exit={{opacity:0}}
                transition={{duration:0.4, delay:0.5}}>
                <h2 className='text-[30px] mb-4 text-md text-neutral-100 font-rajdhani'>NFT Metadata Control</h2>
                <p className='text-[23px] text-neutral-200 font-rajdhani pr-4'>The secret code of the created NFT is securely stored in S3 storage using API Gateway. This code cannot be accessed by anyone other than the buyer of the NFT. AWS Lambda verifies the user through user-signed messages, guaranteeing that only authorized users can access NFT data.</p>
            </motion.div>
            <div className='w-[400px] h-[300px] relative z-[-1]'>
                <Image src={secure} layout='fill' alt="image" className='z-[-1] rounded-[10px]'/>
            </div>
            </div>
        </section>

        <section className='mt-[150px]'>
            <div className='flex justify-center items-center'>
            <div className='w-[400px] h-[300px] relative z-[-1]'>
                <Image src={blockchain} layout='fill' alt="image" className='z-[-1] rounded-[10px]' />
            </div>
            <motion.div className='flex flex-col w-[50%] ml-[50px] z-[-1]'
            initial={{y:0, opacity:0}}
            whileInView={{y:0, opacity:1}}
            exit={{opacity:0}}
            transition={{duration:0.4, delay:0.4}}>
                <h2 className='text-[30px] mb-4 text-md text-neutral-100 font-rajdhani'>XRPL EVM Sidechain</h2>
                <p className='text-[23px] text-neutral-200 font-rajdhani'>{'Our application harnesses the power of the XRPL EVM Sidechain blockchain, a high-performance scaling solution for Ethereum. XRPLs fast and secure transactions ensure that users can engage in decentralized commerce on our platform with efficiency and reduced fees.'} </p>
            </motion.div>
            </div>
        </section>

        <section className='my-[150px]'>
            <div className='flex justify-center items-center'>
            <motion.div className='flex flex-col w-[50%] ml-[50px] z-[-1]' 
                initial={{y:0, opacity:0}}
                whileInView={{y:0, opacity:1}}
                exit={{opacity:0}}
                transition={{duration:0.4, delay:0.5}}>
                <h2 className='text-[30px] mb-4 text-md text-neutral-100 font-rajdhani'>Secure Marketplace for Transactions</h2>
                <p className='text-[23px] text-neutral-200 font-rajdhani pr-4'>Our authentication process requires users to sign and verify before downloading a secret code which can be redeemed to claim benefits, offering a level of protection unparalleled in the industry. Hence Scratch provides the sellers and buyers secure and private marketplace for transactions.</p>
            </motion.div>
            <div className='w-[400px] h-[300px] relative z-[-1] backdrop-blur-xl'>
                <Image src={voucher} layout='fill' alt="image" className='z-[-1] rounded-[10px]  border-[1px] border-neutral-700'/>
            </div>
            </div>
        </section>
    </div>
    </div>
  )
}

export default Items