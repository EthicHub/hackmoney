/* eslint no-use-before-define: "warn" */
const fs = require("fs");
const chalk = require("chalk");
const { config, ethers } = require("hardhat");
const { utils, BigNumber } = require("ethers");
const { parseEther } = require('@ethersproject/units')

const R = require("ramda");
const ipfsAPI = require('ipfs-http-client');
const ipfs = ipfsAPI({host: 'ipfs.infura.io', port: '5001', protocol: 'https' })

const delayMS = 1000 //sometimes xDAI needs a 6000ms break lol 😅

const main = async () => {
  const [sender] = await ethers.getSigners()
  // ADDRESS TO MINT TO:
  const DAI = '0x04DF6e4121c27713ED22341E7c7Df330F56f289B';
  const USDT = '0xcC08220af469192C53295fDd34CFb8DF29aa17AB';
  const amount = parseEther('1')
  const initialBalances = [amount, BigNumber.from('0')];

  const bond = await ethers.getContractAt('NFTBond', fs.readFileSync("./artifacts/NFTBond.address").toString())
  //const principalToken = await ethers.getContractAt('PrincipalToken', fs.readFileSync("./artifacts/PrincipalToken.address").toString())
  //console.log(`Token balance of ${sender.address} is ${await principalToken.balanceOf(sender.address)} `)
  //console.log('Approving...')
  //console.log(await principalToken.approve(bond.address, ethers.utils.parseEther("1000000000000000000000000")))
  //console.log(`Approval of ${principalToken.address} is ${await principalToken.allowance(sender.address, principalToken.address)} `)

  const addresses = []



  const JOIN_KIND = 1;
  console.log(initialBalances)
  // Construct magic userData

  const initUserData =
      ethers.utils.defaultAbiCoder.encode(['uint256', 'uint256[]', 'uint256'],
      [
        JOIN_KIND,
        initialBalances,
        0
      ]);
  console.log(initUserData)
  
  console.log('Joining Pool ....')

  // joins and exits are done on the Vault, not the pool
  
  const joinPoolRequest = {
    assets: [DAI, USDT],
    maxAmountsIn: initialBalances,
    userData: initUserData,
    fromInternalBalance: false
  }
  console.log(joinPoolRequest)
  console.log(joinPoolRequest)
  console.log(await bond.buyBond('http://localhost:3000',10000, ethers.utils.parseEther('1'), 10, joinPoolRequest))
  /*
  console.log(await bond.buyBond('http://localhost:3000',600, ethers.utils.parseEther('1'), 10))
  console.log(`Token balance of ${sender.address} is ${await principalToken.balanceOf(sender.address)} `)
  console.log(`Bond balance of ${sender.address} is ${await bond.balanceOf(sender.address)} `)
  */

  //await sleep(100000)

  //console.log(`Position value of ${sender.address} is ${await bond.positionValue(sender.address)} `)

};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
