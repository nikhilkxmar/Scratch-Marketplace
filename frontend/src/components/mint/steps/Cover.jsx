"use client"
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '@/app/context/Context'
import Image from 'next/image'
import { uploadFileToIPFS } from '../../../app/api/pinata'

const Cover = () => {

  const { userData, setUserData } = useContext(Context)
  const [image, setImage] = useState() 
  const [thumbnailPreview, setThumbnailPreview] = useState() 
  const [message, updateMessage] = useState('')
  const [cover, setCover] = useState(null)
  const thumbnailRef = useRef()
  const [display, setDisplay] = useState(false)


  const handleChange = (val) => {
    setUserData({ ...userData, ["cover"]: val})
  }

  async function uploadCover(e) {
        var file = e.target.files[0]
        if (file) {
            setImage(file)
            try {
                updateMessage("Uploading Image")
                const response = await uploadFileToIPFS(file);
                if(response.success === true) {
                    console.log("Uploaded IMAGE to Pinata: ", response.pinataURL)
                    setCover(response.pinataURL);
                    localStorage.setItem('cover', response.pinataURL);
                    handleChange(cover)
                    updateMessage("Done ...")
                }
            }
            catch(e) {
                console.log("Error during file upload", e);
            } 
        } else {
            setImage(null)
        }
    }

  useEffect(() => {
    if(localStorage.getItem("cover") && localStorage.getItem("cover").length > 0) {
        setDisplay(true)
        console.log("display")
    }   

      if(image) {
            const reader = new FileReader()
            reader.onloadend = () => {
            setThumbnailPreview(reader.result)
            }
            reader.readAsDataURL(image)
        } else {
            setThumbnailPreview(null)
        }
  }, [image])

  return (
    <div className='w-full h-[550px] mt-6 border-gray-600 border-[0.5px]'>
        <div className='flex flex-col justify-center items-center w-full h-full'>
            <div className='w-[80%]'>
              <h2 className="block text-[22px] font-rajdhani font-normal" htmlFor="title">Cover Image</h2>
              <p className="my-4 block text-[18px] font-rajdhani font-normal" htmlFor="title"> Please upload an eye-catching cover image of your Coupon (or) Voucher. This will be your representative image shown to buyers.</p>
              
              <div className="mt-8 w-[77%] bg-transparent h-[333px] relative">
                    {
                    display ? <Image src={localStorage.getItem("cover")} alt='image' fill className='object-cover border-[3px] border-gray-900' onClick={() =>
                    {
                      setDisplay(false)
                      localStorage.removeItem("cover")
                    }} /> :
                    thumbnailPreview ? <Image src={thumbnailPreview} alt='image' fill className='object-cover border-[3px] border-gray-900' onClick={() => setImage(null)}/> :
                    <button className="relative w-full h-full px-6 py-3 font-playfair font-semibold text-black group" 
                    onClick={(e) => {
                        e.preventDefault()
                        thumbnailRef.current.click()}}>
                    <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-transparent group-hover:translate-x-0 group-hover:translate-y-0 border-2 border-gray-300 "></span>
                    <span className="absolute inset-0 w-full h-full border-[3.33px] border-gray-500"></span>
                    <span className="relative text-[17px] text-gray-400">Add Image File</span>
                    </button>}
                    <input type={"file"} accept="image/*" onChange={uploadCover} ref={thumbnailRef} className='hidden' required />
                </div>
              <div className='mt-4 text-[18px] font-rajdhani'>{message}</div>
            </div>
        </div>
    </div>
  )
}

export default Cover