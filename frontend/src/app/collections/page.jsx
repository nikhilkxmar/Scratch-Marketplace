"use client"
import Particle from '@/components/home/Particle'
import GetPurchasedNfts from '../utils/GetPurchasedNfts';
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
                    <h2 className="text-gray-100 text-[36px] font-rajdhani text-center">My Collection</h2>
                    <p className="text-gray-400 text-[22px] font-rajdhani mt-2 text-center">Your Personal Repository of Coupons and Voucher NFTs Purchased – Access, Manage, and Download Your Code to Redeem your Offer!</p>
                </div>

                <GetPurchasedNfts /> 
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
