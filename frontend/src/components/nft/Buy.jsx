import React, {useState} from 'react'
import { useWeb3Contract } from 'react-moralis'
import { contractABI } from "../../constants"


const Buy = ({id, price, errNotification, notification}) => {

  const nftAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
  const [loader, setLoader] = useState(false)

  const { runContractFunction } = useWeb3Contract()

  const buyNft = async(e) => {
    e.preventDefault();
    try {
      setLoader(true)
      await runContractFunction({
        params: {
          abi: contractABI,
          contractAddress: nftAddress,
          functionName: "purchaseItem",
          params: {id: id},
          msgValue: price
        },
          onSuccess: handleSuccess,
          onError: (error) => {
            console.error(error)
            errNotification()
            setLoader(false)
      }
    })
   } catch(e) {
        console.log(e)
    }
  }

  const handleSuccess = async function (tx) {
      await tx.wait(1)
      setLoader(false)
      notification()
      setTimeout(() => {
        window.location.replace("/collections")
      }, 3000)
  }

    
  return (
    <>
      <div className='z-50 fixed top-[0px] left-[0px] backdrop-blur-sm w-screen h-screen' style={{display: loader ? "block" : "none"}}><div className='w-screen h-screen flex justify-center items-center backdrop-blur-sm'><div className='loader'></div></div></div>
      <div className='w-full'>
        <button className='flex items-center shrink-0 mt-[30px]' onClick={buyNft}>
          <div className="relative px-5 py-[8px] overflow-hidden font-medium text-white bg-transparent border-[1px] border-gray-400 group w-[200px]">
          <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-400 group-hover:w-full ease"></span>
          <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-400 group-hover:w-full ease"></span>
          <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-400 group-hover:h-full ease"></span>
          <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-400 group-hover:h-full ease"></span>
          <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-700 opacity-0 group-hover:opacity-100"></span>
          <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease font-rajdhani text-[18px]">BUY NFT</span>
        </div>
        </button>
      </div>
    </>
  )
}

export default Buy