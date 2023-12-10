"use client"
import { useState, useEffect } from 'react'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import {contractABI} from '../../constants'
import {format} from '../helper/format'
import Loader from '@/components/global/Loader'
import NoItems from '@/components/global/NoItems'
import Card from '@/components/nft/Card'

const GetPurchasedNfts = () => {

  const [nfts, setNfts] = useState([])
  let [loading, setLoading] = useState(true)

  const { runContractFunction } = useWeb3Contract()
  const { isWeb3Enabled, account } = useMoralis()

  const nftAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

  const { runContractFunction: itemCount} = useWeb3Contract({
    abi: contractABI,
    contractAddress: nftAddress,
    functionName: "getTotalNfts",
  })

  const loadPurchasedNfts = async() => {
    try {
        const item_hex = await itemCount()
        const item_count = format(item_hex)

        let nfts = []
        for(let i=1; i<=item_count; i++) {
          
          const nft = await runContractFunction({
            params: {
              abi: contractABI,
              contractAddress: nftAddress,
              functionName: "getItems",
              params: {id: i},
              },
          })

          if(nft[4] && nft[3].toLowerCase() == account) {
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

            nfts.push({
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
            })
          }
        }
        setNfts(nfts)
        setLoading(false)
    } catch(e) {
        console.log(e)
    }
  }

  useEffect(() => {
    if(isWeb3Enabled) {
      setLoading(true)
      loadPurchasedNfts()
    }
  }, [isWeb3Enabled, account])


  if (loading) return (
    <main className='w-full mt-24 flex justify-center'>
      <Loader />
    </main>
  )

  return (
    <div className='w-full flex justify-center flex-wrap mt-4'>
      {
        nfts.length > 0 ?
          <div className='grid grid-cols-1 lg:grid-cols-3 max-w-[1240px]'>
            {
              nfts.map((nft) => (
                <div key={nft.Id} className='mx-4 my-4 text-white flex flex-col items-center'>
                   <Card object={nft}/>
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

export default GetPurchasedNfts