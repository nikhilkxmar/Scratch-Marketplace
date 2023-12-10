"use client"
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import {BiGame} from 'react-icons/bi'
import {IoPricetagsOutline} from 'react-icons/io5'
import {AiOutlineArrowRight} from 'react-icons/ai'
import { useMoralis } from 'react-moralis'
import { ethers } from "ethers"
import ConnectWallet from '@/components/global/ConnectWallet'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Particle from '@/components/home/Particle'
import Buy from '@/components/nft/Buy'


export default function Home() {

  const searchParams = useSearchParams()
  const { isWeb3Enabled, account } = useMoralis()

  const signMessage = async () => {
  const uuid = searchParams.get('UUID')
  try {
    console.log(uuid);
    if (!window.ethereum)
      throw new Error("No wallet found");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(uuid);

    console.log("signature: " + signature)

    axios.get('https://g911u3rd79.execute-api.eu-north-1.amazonaws.com/dev/transaction?', {
        params: {
            bucket: process.env.NEXT_PUBLIC_BUCKET,
            id: searchParams.get('Id'),
            key: searchParams.get('UUID'),
            sign: signature
        }
    }).then((response) => {
        let textToWrite = response.data
        textToWrite = textToWrite.toString().replace(/\n/g, "\r\n");
        const url = window.URL.createObjectURL(new Blob([textToWrite]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "code.txt");
        document.body.appendChild(link);
        link.click();
        link.remove();
        notification()
      })
      .catch((err) => {
        console.log(err)
        errNotification()
    })

    } catch (err) {
        console.log(err)
    }
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

  return (
    <div className='relative'>
    <div className="absolute bottom-[0px] left-[0px] w-[40%] h-[550px] blue__gradient z-[-1]"></div>
    <div className="absolute top-[-200px] right-[0px] w-[25%] h-[300px] pink__gradient z-[-1]"></div>
        
    <Particle />


    {isWeb3Enabled ?
      <div className='w-full flex flex-col items-center justify-center mt-[150px]'>
        <div className='w-[70%] flex justify-between items-center flex-row-reverse gap-x-12'>
        <div className='flex flex-col justify-center items-center'>
            <div className='flex justify-center h-[350px] w-[380px]'>
                <Image src={searchParams.get('Cover')} width={400} height={370} alt='image' className='object-cover rounded-[10px]'/>
            </div>
        </div>

        <div>
            <div className='flex justify-start items-center mt-4'>
                <div className='text-gray-100 w-[25px] h-[25px] border-[1px] rotate-45 flex justify-center items-center font-rajdhani'><p className='rotate-[315deg]'>{searchParams.get('Id')}</p></div>
                <h2 className='ml-[20px] font-rajdhani text-gray-100 text-[36px]'>{searchParams.get('Title')}</h2>
            </div>
            

            <div className='mt-[25px] flex justify-start items-center gap-x-4'>
                <BiGame className='text-4xl w-[25px] h-[25px] text-gray-300' />
                <p className='font-rajdhani text-gray-100 text-[20px]'>
                    {searchParams.get('Seller')}
                </p>
            </div>

            <div className='mt-[25px] flex justify-start items-center gap-x-4'>
                <IoPricetagsOutline className='text-4xl w-[25px] h-[25px] text-gray-300' />
                <p className='font-rajdhani text-gray-100 text-[20px]'>
                    {Number(searchParams.get('Price'))/10**18} XRPL
                </p>
            </div>

            <p className='mt-[25px] font-rajdhani text-neutral-300 text-[20px]'>
                Valid From {searchParams.get('From')} Till {searchParams.get('To')}
            </p>

            { searchParams.get('Buyer').toLowerCase() == account ?
            <button className='flex items-center mt-[40px]' onClick={() => signMessage()}>
                <div className="relative px-5 py-[17.5px] overflow-hidden font-medium text-white bg-transparent border-[1px] border-gray-400 group">
                <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-400 group-hover:w-full ease"></span>
                <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-400 group-hover:w-full ease"></span>
                <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-400 group-hover:h-full ease"></span>
                <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-400 group-hover:h-full ease"></span>
                <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-700 opacity-0 group-hover:opacity-100"></span>
                <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease font-rajdhani text-[18px] flex items-center justify-center gap-x-4">
                    <p>DOWNLOAD MODEL</p>
                    <AiOutlineArrowRight className='text-4xl w-[22px] h-[22px] text-white' />
                </span>
                </div>
            </button> : searchParams.get('Buyer') == "0x0000000000000000000000000000000000000000" ?
            <Buy id={searchParams.get('Id')} price={searchParams.get('Price')} errNotification={errNotification} notification={notification} /> : <div className='px-4 py-2 font-rajdhani text-neutral-300 border-[1px] border-neutral-400 w-[75px] text-center mt-[25px] text-[20px]'>SOLD</div>
            }
        </div>
        </div>

        <div className='w-[70%] mt-[120px] border-[0.5px] border-gray-600 rounded-[5px] p-4'>
            <div className='p-4'>
                <h2 className='font-rajdhani text-gray-100 text-[36px]'>Description</h2>
                <p className='mt-[30px] font-rajdhani text-neutral-200 text-[21px]'>{searchParams.get('Description')}</p>
            </div>
        </div>

        <div className='w-[70%] mt-[60px] border-[0.5px] border-gray-600 rounded-[5px] p-4'>
            <div className='p-4'>
                <h2 className='font-rajdhani text-gray-100 text-[36px]'>Terms and Conditions</h2>
                <p className='mt-[30px] font-rajdhani text-neutral-200 text-[21px]'>{searchParams.get('Terms')}</p>
            </div>
        </div>

      </div> : (<div className='mt-12'><ConnectWallet/></div>)
      }
      <ToastContainer />
    </div>
  )
}
