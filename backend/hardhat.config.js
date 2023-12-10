require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("dotenv").config()


const PRIVATE_KEY = process.env.PRIVATE_KEY
const XRPL_RPC_URL = process.env.XRPL_RPC_URL


module.exports = {
  solidity: "0.8.18",

  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
      blockConfirmations: 1,
    },
    xrpl: {
      chainId: 1440002,
      blockConfirmations: 6,
      url: XRPL_RPC_URL,
      accounts: [PRIVATE_KEY],
    },
  },

  namedAccounts: {
    deployer: {
      default: 0,
    },
    player: {
      default: 1,
    },
  },
};
