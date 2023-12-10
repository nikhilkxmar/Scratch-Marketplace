"use client"
import Particle from '@/components/home/Particle'
import { useMoralis } from 'react-moralis'
import ConnectWallet from "@/components/global/ConnectWallet";
import { generateAvatarURL } from '@cfx-kit/wallet-avatar'
import Image from 'next/image'; 
import GetMintedNfts from '../utils/GetMintedNfts';


export default function Home() {

  const { isWeb3Enabled, account } = useMoralis()

  return (
    <main className="w-full">
      <div className="relative">
 
        <div className="absolute bottom-[0px] left-[0px] w-[40%] h-[550px] blue__gradient z-[-1]"></div>
        <div className="absolute top-[-200px] right-[0px] w-[25%] h-[300px] pink__gradient z-[-1]"></div>
        
        <Particle />
        {
            isWeb3Enabled ? 
            <div className='w-full flex flex-col items-center'>
                <div className="max-w-[50%] mt-[170px] flex flex-col items-center">

                  <div className='relative w-[100px] h-[100px]'>
                    <Image src={generateAvatarURL(account)} width={100} height={100} alt='image' className='object-cover rounded-full'/>
                  </div>

                  <h2 className="mt-[30px] text-gray-100 text-[36px] font-rajdhani text-center">{account.slice(0,6)}...{account.slice(account.length - 6)}</h2>
                  <p className="text-gray-400 text-[22px] font-rajdhani mt-[10px] text-center">
                    Gain Insights on your Minted Coupons and Voucher NFTs which have been Listed to sale and NFTs Sold through our Decentralized Marketplace! 
                  </p>
                </div>

                <GetMintedNfts />
            </div>
                : 
            <div className="my-[200px]">
                <ConnectWallet />
            </div>
        }      
      </div>
    </main>
  )
}
