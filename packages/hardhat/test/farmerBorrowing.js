const { ethers } = require("hardhat");
const { use, expect } = require("chai");
const { solidity } = require("ethereum-waffle");
const { parseEther, formatEther } = require('@ethersproject/units')
const { BigNumber } = require('@ethersproject/bignumber')

use(solidity);

describe.only("FarmerBorroing", function () {
  let borrowing, reserve, owner, reserveMock, pile

  describe("FarmerBorrowing", function () {
    it("Should deploy all", async function () {
      const signers = await ethers.getSigners()
      owner = signers[0]
      farmer = signers[1]
      const PrincipalToken = await ethers.getContractFactory("PrincipalToken")
      principalToken = await PrincipalToken.deploy();

      const ReserveMock = await ethers.getContractFactory("ReserveMock")
      reserveMock = await ReserveMock.deploy(principalToken.address)
      principalToken.transfer(reserveMock.address, parseEther("10000"))
      const Pile = await ethers.getContractFactory("Pile")
      pile = await Pile.deploy()

      const FarmerBorrowing = await ethers.getContractFactory("FarmerBorrowing");
      borrowing = await FarmerBorrowing.deploy(principalToken.address, pile.address, reserveMock.address)

      reserveMock.setBorrowingContract(borrowing.address)

      
    });

    describe("borrow", function () {
      it("Should be able to create loan", async function () {
        const maturity = ethers.BigNumber.from("31536000")
        const farmerBorrowing = borrowing.connect(farmer)
        const loanId = await farmerBorrowing.callStatic.requestLoan('1000000003593629043335673583', parseEther('10000'), maturity)

        await farmerBorrowing.requestLoan('1000000003593629043335673583', parseEther('10000'), maturity)
        console.log(loanId)
        expect(loanId).to.equal(ethers.BigNumber.from('1'))
        const borrowAmount = parseEther('1000')
        await farmerBorrowing.borrow(loanId, borrowAmount)
        await farmerBorrowing.withdraw(loanId, borrowAmount, farmer.address)
        const debt = await pile.debt(loanId)
        console.log(formatEther(debt))
        ethers.provider.send('evm_increaseTime', [31536000])
        ethers.provider.send('evm_mine')
        expect(await principalToken.balanceOf(farmer.address)).to.equal(parseEther('1000'))
        console.log(formatEther(await pile.debt(loanId)))
        //1000000003593629043335673583 12% compounding in seconds

      });
    });
  });
});
