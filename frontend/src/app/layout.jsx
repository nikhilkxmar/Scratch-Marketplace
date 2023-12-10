"use client"
import './globals.css'
import Image from 'next/image';
import { MoralisProvider } from "react-moralis";
import NavBar from '@/components/navigation/NavBar';
import Footer from '@/components/navigation/Footer';
import notImage from '../assets/noitem.png'


export default function RootLayout({ children }) {
  return (
    <MoralisProvider initializeOnMount={false}>
    <html lang="en">
      <head>
        <title>Sratch</title>
      </head>

      <body>
        <div className='lg:block hidden'>
          <NavBar/>
          {children}
          <Footer/>
        </div>

        <div className='w-screen h-screen lg:hidden p-6 flex flex-col justify-center items-center relative' style={{ backgroundImage: "url(/star.png)", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
          <div className="absolute top-[-150px] left-[0px] w-[40%] h-[350px] blue__gradient z-[1]"></div>
          <div className="absolute top-[-200px] right-[0px] w-[25%] h-[300px] pink__gradient z-[1]"></div>
          <div className='relative w-[300px] h-[300px]'>
            <Image src={notImage} alt='image' fill className='object-cover'/>
          </div>
          <p className='font-rajdhani text-[22px] text-gray-100 text-center mt-4'>INCOMPATIBLE DEVICE</p>
          <h2 className='font-rajdhani text-[19px] text-gray-100 text-center mt-2'>We are not available for smaller devices yet!! <br /> Sorry for the inconvenience</h2>
        </div>
      </body>
    </html>
    </MoralisProvider>
  )
}