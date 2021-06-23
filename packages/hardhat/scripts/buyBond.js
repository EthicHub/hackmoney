/* eslint no-use-before-define: "warn" */
const fs = require("fs");
const chalk = require("chalk");
const { config, ethers } = require("hardhat");
const { utils, BigNumber } = require("ethers");
const R = require("ramda");
const ipfsAPI = require('ipfs-http-client');
const ipfs = ipfsAPI({host: 'ipfs.infura.io', port: '5001', protocol: 'https' })

const delayMS = 1000 //sometimes xDAI needs a 6000ms break lol 😅

const main = async () => {
  const [sender] = await ethers.getSigners()
  // ADDRESS TO MINT TO:


  const bond = await ethers.getContractAt('NFTBond', fs.readFileSync("./artifacts/NFTBond.address").toString())
  const principalToken = await ethers.getContractAt('PrincipalToken', fs.readFileSync("./artifacts/PrincipalToken.address").toString())
  console.log(`Token balance of ${sender.address} is ${await principalToken.balanceOf(sender.address)} `)
  console.log('Approving...')
  console.log(await principalToken.approve(bond.address, ethers.utils.parseEther("1000000000000000000000000")))
  console.log(`Approval of ${principalToken.address} is ${await principalToken.allowance(sender.address, principalToken.address)} `)

  console.log('Buying bond..')

  console.log(await bond.buyBond('http://localhost:3000',600, ethers.utils.parseEther('1'), 10))
  console.log(`Token balance of ${sender.address} is ${await principalToken.balanceOf(sender.address)} `)
  console.log(`Bond balance of ${sender.address} is ${await bond.balanceOf(sender.address)} `)

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
