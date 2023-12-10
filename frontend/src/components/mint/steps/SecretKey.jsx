"use client"
import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {v4 as uuidv4} from 'uuid'
import { Context } from '@/app/context/Context'
import Button from '@/components/navigation/Button'


const SecretKey = () => {

  const [message, updateMessage] = useState('')
  const { userData, setUserData } = useContext(Context)
  const [key, setKey] = useState('') 
  const [upload, setUpload] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value})
  }

  const uploadSecretKey = async() => {
    const file = new Blob([key], {
      type: "text/plain;charset=utf-8"
    })

    try {
        updateMessage("Uploading Code")
        const uuid = uuidv4()

        await axios.put(`https://wizqobfbe1.execute-api.eu-north-1.amazonaws.com/devv/${process.env.NEXT_PUBLIC_BUCKET}/${uuid}/`, file).then(() => {
            console.log("FILE UPLOADED TO AWS: " + uuid)
            localStorage.setItem('UUID', uuid);
            updateMessage("Done ...")
            document.getElementById("key").disabled = true
            setUpload(true)
            setTimeout(() => {
                updateMessage("")
            }, 2000)
        })
    }
    catch(e) {
        console.log("Error during file upload", e);
    }
  }

  useEffect(() => {
    if(localStorage.getItem('UUID')) {
      document.getElementById("key").disabled = true
      setUpload(true)
    }
  }, [])

  return (
      <div className='w-full h-[550px] mt-6 border-gray-600 border-[0.5px]'>
        <div className='flex flex-col justify-center items-center w-full h-full'>
            <div className='w-[80%]'>
              <h2 className="block text-[22px] font-rajdhani font-normal">{'Reedem Code'}</h2>
              <p className="my-4 block text-[18px] font-rajdhani font-normal">{'Upload the Secret Redeem Code of the Coupon (or) Voucher. This will be safely stored using our services and can be accessed only by the buyer of this NFT.'}</p>

              <div className='w-full flex justify-center items-center'>
                <input className="w-[50%] bg-transparent w-full py-2 px-3 text-gray-200 leading-tight border-[3px] border-gray-500 text-[17px] font-playfair focus:border-[3.33px]" id="key" type="text"
                  onChange={e => setKey(e.target.value)} value={key} 
                />
                <div className={!upload ? "cursor-pointer" : "pointer-events-none"} onClick={() => uploadSecretKey()}>
                  <Button tag={!upload ? 'UPLOAD' : "UPLOADED"} height={"py-[8px]"} />
                </div>
              </div>
            </div>

            <div className='w-[80%] mt-12'>
              <h2 className="block text-[22px] font-rajdhani font-normal">Validity Period</h2>
              <p className="my-4 block text-[18px] font-rajdhani font-normal">Please specify the Validity Period of the Coupon (or) Voucher, This shows the buyers the time left for them to Redeem the Voucher.</p>

              <div className='flex justify-start gap-12 mt-8'>
                <div className='flex items-center justify-center'>
                  <p className="block text-[18px] font-rajdhani font-normal mr-4">From</p>
                  <input type={"date"} className='font-rajdhani text-[18px] text-gray-300 cursor-pointer bg-transparent border-[2.2px] border-gray-500 py-2 px-4' id="from"
                  onChange={handleChange}
                  name='from'
                  value={undefined}
                  />
                </div>
                <div className='flex items-center justify-center'>
                  <p className="block text-[18px] font-rajdhani font-normal mr-4">To</p>
                  <input type={"date"} className='font-rajdhani text-[18px] text-gray-300 cursor-pointer bg-transparent border-[2.2px] border-gray-500 py-2 px-4' id="to" 
                  onChange={handleChange}
                  name='to'
                  value={undefined}
                  />
                </div>
              </div>
              <div className='mt-8 text-[18px] font-rajdhani'>{message}</div>
            </div>
        </div>
    </div>
  )
}

export default SecretKey