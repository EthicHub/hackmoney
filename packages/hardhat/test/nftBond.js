const { ethers } = require("hardhat");
const { use, expect } = require("chai");
const { solidity } = require("ethereum-waffle");
const { parseEther, formatEther } = require('@ethersproject/units')
const { BigNumber } = require('@ethersproject/bignumber')

use(solidity);

describe("NFT Bond", function () {
  let bond, principalToken,owner, principal

  describe("NFTBond", function () {
    it("Should deploy NFTBond", async function () {
      const signers = await ethers.getSigners()
      owner = signers[0]
      const PrincipalToken = await ethers.getContractFactory("PrincipalToken")
      principalToken = await PrincipalToken.deploy();

      const NFTBond = await ethers.getContractFactory("NFTBond");

      bond = await NFTBond.deploy(principalToken.address);
      const tokenAdd = await bond.principalToken()
      expect(principalToken.address).to.equal(tokenAdd)
    });

    describe("buyBond", function () {
      it("Should be able to buy bond", async function () {
        // ADDRESS TO MINT TO:
      
        const initialBalance = await principalToken.balanceOf(owner.address)
        console.log('initialBalance', formatEther(initialBalance))
        principal = parseEther('10')
        const tx = await principalToken.approve(bond.address, parseEther('111111111111111111111111111111111111'))

        await bond.buyBond('http://localhost:3000', 600, principal, 10)
        const finalBalance = await principalToken.balanceOf(owner.address)
        console.log('finalBalance', formatEther(finalBalance))

        expect(finalBalance).to.equal(initialBalance.sub(principal))
        const bondBalance = await bond.balanceOf(owner.address)
        console.log(bondBalance)
        expect(bondBalance).to.equal(BigNumber.from('1'))
        const mintedBond = await bond.bonds(BigNumber.from('1'))
        expect(mintedBond['interest']).to.equal(BigNumber.from(10))

      });
      it("Should increase interest", async function() {
        await ethers.provider.send("evm_increaseTime", [10000])
        const value = await bond.positionValue(BigNumber.from('1'))
        expect(value).to.gt(principal)

      })
    });
  });
});
