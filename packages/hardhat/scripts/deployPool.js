/* eslint no-use-before-define: "warn" */
const fs = require("fs");
const chalk = require("chalk");
const { config, ethers } = require("hardhat");
const { utils, BigNumber } = require("ethers");
const R = require("ramda");
const ipfsAPI = require('ipfs-http-client');
const ipfs = ipfsAPI({host: 'ipfs.infura.io', port: '5001', protocol: 'https' })

const delayMS = 1000 //sometimes xDAI needs a 6000ms break lol 😅

const VAULT = '0xBA12222222228d8Ba445958a75a0704d566BF2C8';
const vaultABI = require('./vaultABI.json')

const WEIGHTED_POOL_FACTORY = '0x8E9aa87E45e92bad84D5F8DD1bff34Fb92637dE9';
const weightedPoolABI = require('./weightedPoolAbi.json')
const ASSET_MANAGER_WEIGHTED_POOL_FACTORY = '0xdcdbf71A870cc60C6F9B621E28a7D3Ffd6Dd4965'; // Asset Manager capable, Kovan

const asssetManagerWeightedPoolFactoryABI = require("./assetManagerWeightedPool.json")
const weightedPoolFactoryABI = require('./weightedPool.json')
const iErc20ABI = require("./ierc20.json")
const { parseEther } = require('@ethersproject/units')

// const ORACLE_POOL_FACTORY = '0xA5bf2ddF098bb0Ef6d120C98217dD6B141c74EE0';
// const STABLE_POOL_FACTORY = '0x791F9fD8CFa2Ea408322e172af10186b2D73baBD';

// const DELEGATE_OWNER = '0xBA1BA1ba1BA1bA1bA1Ba1BA1ba1BA1bA1ba1ba1B';

const DAI = '0x04DF6e4121c27713ED22341E7c7Df330F56f289B';
const USDT = '0xcC08220af469192C53295fDd34CFb8DF29aa17AB';

const tokens = [DAI, USDT];
const weights = [parseEther('0.5'), parseEther('0.5')];

const NAME = 'Two Test Pool';
const SYMBOL = '50DAI-50USDT';
const swapFeePercentage = parseEther('0.05'); // 0.5%

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';   

const createPool = async (sender) => {
  const factory = new ethers.Contract(WEIGHTED_POOL_FACTORY, weightedPoolFactoryABI, sender);

  console.log('Creating pool....')
  const tx = await factory.create(NAME, SYMBOL, tokens, weights,
                                swapFeePercentage, ZERO_ADDRESS);
  const receipt = await tx.wait();

  // We need to get the new pool address out of the PoolCreated event
  // (Or just grab it from Etherscan)
  const events = receipt.events.filter((e) => e.event === 'PoolCreated');
  const poolAddress = events[0].args.pool;
  console.log('Pool created ....' + poolAddress)

  // We're going to need the PoolId later, so ask the contract for it
  const pool = new ethers.Contract(poolAddress, weightedPoolABI, sender);// ethers.getContractAt('WeightedPool', poolAddress);
  const poolId = await pool.getPoolId();
  console.log('poolId...', poolId)
  return { pool, poolAddress, poolId}
}


const main = async () => {
  const [sender] = await ethers.getSigners()
  // ADDRESS TO MINT TO:

  // const factory = new ethers.Contract(ASSET_MANAGER_WEIGHTED_POOL_FACTORY, asssetManagerWeightedPoolFactoryABI, sender);

  // const factory = await ethers.getContractAt('WeightedPoolFactory',
  //                                         WEIGHTED_POOL_FACTORY);
  //const vault = await ethers.getContractAt('Vault', VAULT);
  const vault = new ethers.Contract(VAULT, vaultABI, sender);

  const poolId =  "0x70b7d3b3209a59fb0400e17f67f3ee8c37363f490002000000000000000000d8"



// ZERO_ADDRESS owner means fixed swap fees
// DELEGATE_OWNER grants permission to governance for dynamic fee management
// Any other address lets that address directly set the fees
  
  // Tokens must be in the same order
  // Values must be decimal-normalized! (USDT has 6 decimals)
  const initialBalances = [parseEther('100'), parseEther('100')];

  const JOIN_KIND_INIT = 0;

  // Construct magic userData
  const initUserData =
      ethers.utils.defaultAbiCoder.encode(['uint256', 'uint256[]'], 
                                          [JOIN_KIND_INIT, initialBalances]);
  console.log(initUserData)

  console.log(ethers.utils.defaultAbiCoder.decode(['uint256', 'uint256[]'], initUserData))
  const joinPoolRequest = {
    assets: tokens,
    maxAmountsIn: initialBalances,
    userData: initUserData,
    fromInternalBalance: false
  } 

  // Caller is "you". joinPool takes a sender (source of initialBalances)
  // And a receiver (where BPT are sent). Normally, both are the caller.
  // If you have a User Balance of any of these tokens, you can set
  // fromInternalBalance to true, and fund a pool with no token transfers
  // (well, except for the BPT out)

  // Need to approve the Vault to transfer the tokens!
  // Can do through Etherscan, or programmatically
  /*
  console.log('Approving DAI ....')

  const dai = new ethers.Contract(DAI, iErc20ABI, sender);

  //const mkr = await ethers.getContractAt('ERC20', MKR);

  const appDaiTx = await dai.approve(VAULT, parseEther('10000000000000'));
  await appDaiTx.wait()

  console.log('Approving USDT ....')


  const usdt = new ethers.Contract(USDT, iErc20ABI, sender);

  //const mkr = await ethers.getContractAt('ERC20', MKR);
  const appUSDTx = await usdt.approve(VAULT, parseEther('10000000000000'));
  await appUSDTx.wait()
  */

  console.log('Joining Pool ....')

  console.log(joinPoolRequest)
  // joins and exits are done on the Vault, not the pool
  let joinTx
  try {
    joinTx = await vault.joinPool(poolId, sender.address, sender.address, joinPoolRequest);

  } catch(error) {
    console.log(error)
    console.log('----------------')
  }
  // You can wait for it like this, or just print the tx hash and monitor
  const joinReceipt = await joinTx.wait();
  console.log(joinReceipt)
  
  




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
