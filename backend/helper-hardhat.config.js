const { ethers } = require("hardhat")

const networkConfig = {
    31337: {
        name: 'hardhat',
    },
    1440002: {
        name: 'xrpl',
    }
}

developmentChains = ['hardhat', 'localhost']

module.exports = {
    networkConfig,
    developmentChains,
}