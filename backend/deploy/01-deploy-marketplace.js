const { network } = require("hardhat")
const { developmentChains } = require('../helper-hardhat.config')
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const {deploy, log} = deployments
    const {deployer} = await getNamedAccounts()

    args = [1]

    const NFTMarketplace = await deploy("Scratch", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    if(!developmentChains.includes(network.name)) {
        log("verifying")
        await verify(NFTMarketplace.address, args)
    }
    log("_______________________________________")
}

module.exports.tags = ["all", "nftmarketplace"]