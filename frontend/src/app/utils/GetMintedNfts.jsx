"use client"
import { useState, useEffect } from 'react'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import {contractABI} from '../../constants'
import {format} from '../helper/format'
import Loader from '@/components/global/Loader'
import NoItems from '@/components/global/NoItems'
import Minted from '@/components/nft/Minted'

const GetMintedNfts = () => {

  const [listed, setlisted] = useState([])
  const [sold, setSold] = useState([])
  const [control, setControl] = useState(1)
  let [loading, setLoading] = useState(true)
  

  const { runContractFunction } = useWeb3Contract()
  const { isWeb3Enabled, account } = useMoralis()

  const nftAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

  const { runContractFunction: itemCount} = useWeb3Contract({
    abi: contractABI,
    contractAddress: nftAddress,
    functionName: "getTotalNfts",
  })

  const loadListedItems = async() => {
    try {
        const item_hex = await itemCount()
        const item_count = format(item_hex)

        let listed_nfts = []
        let sold_nfts = []

        for(let i=1; i<=item_count; i++) {
          
          const nft = await runContractFunction({
            params: {
              abi: contractABI,
              contractAddress: nftAddress,
              functionName: "getItems",
              params: {id: i},
              },
          })

          if(nft[2].toLowerCase() == account) {
            const uri = await runContractFunction({
              params: {
                abi: contractABI,
                contractAddress: nftAddress,
                functionName: "tokenURI",
                params: {tokenId: i},
              },
            })
      
            const data = await fetch("https://gateway.pinata.cloud/ipfs/" + uri)
            const metadata = await data.json()
            
            const price = await runContractFunction({
            params: {
                abi: contractABI,
                contractAddress: nftAddress,
                functionName: "getTotalPrice",
                params: {id: i},
              },
            })

            let nft_item = {
              Id: format(nft[0]),
              Seller: nft[2],
              Buyer: nft[3],
              Price: format(price),

              Title: metadata.Title,
              Description: metadata.Description,
              Cover: metadata.Cover,
              Terms: metadata.Terms,
              From: metadata.From,
              To: metadata.To,
              UUID: metadata.UUID,  
            }

            if(!nft[4]) {
                listed_nfts.push(nft_item)
            } else {
                sold_nfts.push(nft_item)
            }
          }
        }
        setlisted(listed_nfts)
        setSold(sold_nfts)
        setLoading(false)
    } catch(e) {
        console.log(e)
    } 
  }

  useEffect(() => {
    if(isWeb3Enabled) {
      setLoading(true)
      loadListedItems()
    }
  }, [isWeb3Enabled, account])


  if (loading) return (
    <main className='w-full mt-24 flex justify-center'>
      <Loader />
    </main>
  )

  return (
    <div className='w-full flex justify-center flex-wrap'>
        <div className='flex justify-center mt-[30px] mb-[50px]'>
           <button className={`text-gray-200 text-[22px] font-rajdhani mt-2 text-center border-[1px] border-gray-400 px-[15px] py-2 text-md mr-[50px] hover:border-neutral-200 hover:bg-neutral-300 hover:bg-opacity-10 hover:scale-y-110 duration-200 transition ease-in-out ${control==1 ? "bg-neutral-300 bg-opacity-20" : ""}`}
           onClick={() => setControl(1)}
           >LISTED NFTS : {listed.length}</button>

           <div className='bg-neutral-400 h-[60px] w-[3px]'></div>

           <button className={`text-gray-200 text-[22px] font-rajdhani mt-2 text-center border-[1px] border-gray-400 px-[15px] py-2 text-md ml-[50px] hover:border-neutral-200 hover:bg-neutral-300 hover:bg-opacity-10 hover:scale-y-110 duration-200 transition ease-in-out ${control==2 ? "bg-neutral-300 bg-opacity-20" : ""}`}
           onClick={() => setControl(2)}
           >SOLD NFTS : {sold.length}</button>
        </div>

      {
        (control==1 ? listed : sold).length > 0 ?
          <div className='grid grid-cols-1 lg:grid-cols-3 max-w-[1240px]'>
            {
              (control==1 ? listed : sold).map((nft) => (
                <div key={nft.Id} className='mx-4 my-4 text-white flex flex-col items-center'>
                   <Minted object={nft}/>
                </div>
              ))
            }
          </div> : (
            <div className='w-full flex justify-center'>
              <NoItems />
            </div>
          )
      }
    </div>
  )
}

export default GetMintedNfts