"use client"
import Particle from '@/components/home/Particle'
import Sidemenu from "@/components/mint/Sidemenu"
import Control from "@/components/mint/Control"
import Details from "@/components/mint/steps/Details"
import Cover from "@/components/mint/steps/Cover"
import Terms from "@/components/mint/steps/Terms"
import SecretKey from "@/components/mint/steps/SecretKey"
import { useState } from "react"
import { Context } from "../context/Context"
import { useMoralis } from 'react-moralis'
import ConnectWallet from '@/components/global/ConnectWallet'


export default function Home() {

  const { isWeb3Enabled } = useMoralis()
  const [currentStep, setCurrentStep] = useState(1)
  const [userData, setUserData] = useState({"title": '', "description": ''})
  const [finalData, setFinalData] = useState([])

  const steps = [
    "Details",
    "Cover",
    "T&C",
    "Redeem"
  ]

  const displayStep = (step) => {
    switch(step) {
      case 1:
        return <Details />
      case 2:
        return <Cover />
      case 3:
        return <Terms />
      case 4:
        return <SecretKey />
    }
  }

  const handleClick = (direction) => {
    let newStep = currentStep
    direction == "next" ? newStep++ : newStep--
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep)
  }

  return (
    <div>
      <div className='relative'>

      <div className="absolute top-[100px] left-[0px] w-[40%] h-[350px] blue__gradient z-[-1]"></div>
      <div className="absolute top-[-200px] right-[0px] w-[25%] h-[300px] pink__gradient z-[-1]"></div>

      <Particle />

      <div className="w-full flex justify-center items-center mt-[175px] mb-[75px]">
        <div className="max-w-[50%]">
          <h2 className="text-gray-100 text-[36px] font-rajdhani text-center">Mint Your Coupons & Vouchers</h2>
          <p className="text-gray-400 text-[22px] font-rajdhani mt-2 text-center">Transform Your Coupons & Voucher into Unique Digital Assets & List it for the World to Discover and Purchase your NFTs</p>
        </div>
      </div>
      {isWeb3Enabled ?
      <div className="text-white flex mx-4 items-center justify-between">
        <Sidemenu 
          steps = {steps}
          currentStep={currentStep}
        />

        <Context.Provider value={{
            userData,
            setUserData,
            finalData,
            setFinalData
          }}>
            {displayStep(currentStep)}
        

        <Control 
          handleClick={handleClick}
          currentStep={currentStep}
          steps={steps}
        />
        </Context.Provider>
      </div> : (<div className="mt-12"><ConnectWallet /></div>)}
    </div>
    </div>
  )
}