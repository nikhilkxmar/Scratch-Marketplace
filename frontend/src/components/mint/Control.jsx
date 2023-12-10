"use client"
import React, {useContext, useState, useEffect} from 'react'
import { Context } from '@/app/context/Context'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import { contractABI } from "../../constants"
import { uploadJSONToIPFS } from '../../app/api/pinata'
import { ethers } from 'ethers'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Control = ({handleClick, currentStep, steps}) => {
  const { userData } = useContext(Context)
  const [message, updateMessage] = useState('')
  const [loader, setLoader] = useState(false)
  const [uri, setUri] = useState("");
  const [setting, setSetting] = useState(false);
  const [update, setUpdate] = useState(false);
  const { isWeb3Enabled } = useMoralis()
  
  const nftAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
  const {runContractFunction} = useWeb3Contract()

  async function uploadMetadataToIPFS() {
        if( !userData.title || !userData.description || !localStorage.getItem('cover') || !userData.value || !userData.terms || !userData.from || !userData.to || !localStorage.getItem('UUID'))
        {
            updateMessage("Please fill all the fields!")
            setTimeout(() => {
                updateMessage("")
            }, 2000);
            return -1
        }

        const nftJSON = {
            "Title": userData.title,
            "Description": userData.description,
            "Cover": localStorage.getItem('cover'),
            "Price": userData.value,
            "Terms": userData.terms,
            "From": userData.from,
            "To": userData.to,
            "UUID": localStorage.getItem('UUID'),         
        }

        console.log(nftJSON)

        try {
            updateMessage("Generating...")
            const response = await uploadJSONToIPFS(nftJSON);
            if(response.success === true){
                console.log("Uploaded JSON to Pinata: ", response.pinataURL)
                updateMessage("")
                return response.pinataURL
            }
        }
        catch(e) {
            console.log("error uploading JSON metadata:", e)
        }
    }


    useEffect(() => {
     async function updateUI() {
        if(setting) {
           const metadataURL = await uploadMetadataToIPFS()
           if (metadataURL != -1) {
            console.log(metadataURL)
            setUri(metadataURL)
            setUpdate(true)
            listNFT
           } else {
            setSetting(false)
           }
          } 
      }
    updateUI()
    }, [setting, isWeb3Enabled, update]);


    async function listNFT() {
        setSetting(true)
        if(update) {
            setLoader(true)
        try {    
            updateMessage("Minting...")
            console.log(uri)

            if (uri) {
            const price = ethers.utils.parseEther(userData.value.toString())
            console.log(price)
            await runContractFunction
            ({
                params: {
                  abi: contractABI,
                  contractAddress: nftAddress,
                  functionName: "makeItem",
                  params: {tokenURI: uri, price: price},
                },
                onSuccess: handleSuccess,
                onError: (error) => {
                    console.error(error)
                    setLoader(false)
                    localStorage.removeItem("cover")
                    localStorage.removeItem("UUID")
                    errNotification()
                }
            })
          }
        }
        catch(e) {
            alert( "Upload error" + e )
        }}
    }

    const notification = () => {
        toast.success('Transaction Successful', {
            position: "bottom-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const errNotification = () => {
    toast.error('Transaction Failed', {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    }


    const handleSuccess = async function (tx) {
        await tx.wait(1)
        setLoader(false)
        notification()
        localStorage.removeItem("cover")
        localStorage.removeItem("UUID")
        setTimeout(() => {
          window.location.replace("/dashboard")
        }, 3000)
    }

  return (
    <>
    <div className='z-50 fixed top-[0px] left-[0px] backdrop-blur-sm w-screen h-screen' style={{display: loader ? "block" : "none"}}><div className='w-screen h-screen flex justify-center items-center backdrop-blur-sm'><div className='loader'></div></div></div>
    <div className='flex flex-col justify-center items-center gap-6 ml-[40px] mr-[100px]'>
    <button className={`ml-2 flex items-center shrink-0 ${currentStep == 1 ? "opacity-50 cursor-not-allowed" : ""}`} onClick={() => handleClick("back")}>
        <div className="relative px-5 py-[17.5px] overflow-hidden font-medium text-white bg-transparent border-[1px] border-gray-400 group">
        <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-400 group-hover:w-full ease"></span>
        <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-400 group-hover:w-full ease"></span>
        <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-400 group-hover:h-full ease"></span>
        <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-400 group-hover:h-full ease"></span>
        <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-700 opacity-0 group-hover:opacity-100"></span>
        <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease font-rajdhani text-[18px]">BACK</span>
        </div>
    </button>

    <button className='ml-2 flex items-center shrink-0' onClick={currentStep != steps.length ? () => handleClick("next") : () => listNFT()}>
        <div className="relative px-5 py-[17.5px] overflow-hidden font-medium text-white bg-transparent border-[1px] border-gray-400 group">
        <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-400 group-hover:w-full ease"></span>
        <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-400 group-hover:w-full ease"></span>
        <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-400 group-hover:h-full ease"></span>
        <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-400 group-hover:h-full ease"></span>
        <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-700 opacity-0 group-hover:opacity-100"></span>
        <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease font-rajdhani text-[18px]">{currentStep == steps.length ? !update ? "URI" : "MINT" : "NEXT"}</span>
        </div>
    </button>

    <div className='mt-4 text-[18px] font-rajdhani text-center'>{message}</div>
    </div>
    <ToastContainer />
    </>
  )
}

export default Control