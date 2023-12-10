"use client"
import Particle from '@/components/home/Particle'
import GetStoreNfts from "../utils/GetStoreNfts";
import { useMoralis } from 'react-moralis'
import ConnectWallet from "@/components/global/ConnectWallet";

export default function Home() {

  const { isWeb3Enabled } = useMoralis()

  return (
    <main className="w-full">
      <div className="relative">
 
        <div className="absolute bottom-[0px] left-[0px] w-[40%] h-[550px] blue__gradient z-[-1]"></div>
        <div className="absolute top-[-200px] right-[0px] w-[25%] h-[300px] pink__gradient z-[-1]"></div>
        
        <Particle />
        {
            isWeb3Enabled ? 
            <div className='w-full flex flex-col items-center'>
                <div className="max-w-[50%] mt-[170px]">
                  <h2 className="text-gray-100 text-[36px] font-rajdhani text-center">Discover Exclusive Vouchers & Coupons</h2>
                  <p className="text-gray-400 text-[22px] font-rajdhani mt-2 text-center">Explore a World of Possibilities – Browse and Purchase Coupons and Voucher NFTs from Our Diverse Collection. Your Next discount Awaits!</p>
                </div>

                <GetStoreNfts /> 
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
