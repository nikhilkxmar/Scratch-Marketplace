const { ethers, network } = require("hardhat")
const fs = require('fs')
const { Contract } = require("ethers")

const FRONT_END_ADDRESS_FILE = '../frontend/constants/nftContractAddress.json'
const FRONT_END_ABI_FILE = '../frontend/constants/contractABI'


module.exports = async function () {
    if (process.env.UPDATE_FRONT_END) {
        console.log("updating front end...")
        await updateContractAddresses()
        await updateABI()
    }   
}

async function updateABI() {
    const nftMarketplace = await ethers.getContract("Nft")
    fs.writeFileSync(FRONT_END_ABI_FILE, nftMarketplace.interface.format(ethers.utils.FormatTypes.json))
}

async function updateContractAddresses() {
   const nftMarketplace = await ethers.getContract("Nft") 
   const chainId = network.config.chainId.toString()
   const currentAddress = JSON.parse(fs.readFileSync(FRONT_END_ADDRESS_FILE, 'utf8'))
   if (chainId in currentAddress) {
        if (!currentAddress[chainId].includes(nftMarketplace.address)) {
            currentAddress[chainId].push(nftMarketplace.address)
        }
   }
   {
        currentAddress[chainId] = [nftMarketplace.address]
   }
   fs.writeFileSync(FRONT_END_ADDRESS_FILE, JSON.stringify(currentAddress))
}

module.exports.tags = ["all", "frontend"]