import { ethers } from 'ethers'

export const format = (count) => {
  const balanceHex = count._hex;
  const balanceBigNumber = ethers.BigNumber.from(balanceHex);
  const balanceDecimal = ethers.utils.formatEther(balanceBigNumber);
  const number = balanceDecimal * 10**18;
  return number
}