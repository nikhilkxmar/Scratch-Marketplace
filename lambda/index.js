const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const ethers = require("ethers");
const marketplace_ABI = require("./contracts/marketplaceContractABI.json");
require('dotenv').config()


exports.handler = async (event) => {    

    const contract_address = process.env.CONTRACT_ADDRESS
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_PROVIDER)
    const contract = new ethers.Contract(contract_address, marketplace_ABI, provider)

    const nft = await contract.getItems(event.id)

    let auth = true
    const message = event.key
    const signature = event.sign
    const address = nft[3]
    const signerAddr = await ethers.utils.verifyMessage(message, signature)

    if (signerAddr.toLowerCase() !== address.toLowerCase()) {
      auth = false
    }

    var params = { 
        Bucket: event.bucket,
        Key: event.key
    };

    try {
      if(auth) {
        const data = await s3.getObject(params).promise();
        return data.Body.toString('utf-8');
      } else {
        return "Unauthorized"
      }
    } catch (e) {
      throw new Error(`Could not retrieve file from S3: ${e.message}`)
    }
};