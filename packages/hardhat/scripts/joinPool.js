/* eslint no-use-before-define: "warn" */
const fs = require("fs");
const chalk = require("chalk");
const { config, ethers, tenderly, run } = require("hardhat");
const { utils, BigNumber } = require("ethers");
const R = require("ramda");
const { parseEther } = require('@ethersproject/units')
const VAULT = '0xBA12222222228d8Ba445958a75a0704d566BF2C8';
const vaultABI = require('./vaultABI.json')
const poolId = "0xCE3E75704E3446AF8871639886ADC7E007B232ED0002000000000000000000DA"
const iErc20ABI = require("./ierc20.json")

const main = async () => {

  console.log("\n\n 📡 Deploying...\n");
  console.log('Approving DAI ....')
  const DAI = '0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa';
  const USDT = '0xcC08220af469192C53295fDd34CFb8DF29aa17AB';
  const [sender] = await ethers.getSigners()
  /*
  const dai = new ethers.Contract(DAI, iErc20ABI, sender);

  //const mkr = await ethers.getContractAt('ERC20', MKR);

  const appDaiTx = await dai.approve(VAULT, parseEther('10000000000000000'));
  await appDaiTx.wait()

  console.log('Approving USDT ....')


  const usdt = new ethers.Contract(USDT, iErc20ABI, sender);

  //const mkr = await ethers.getContractAt('ERC20', MKR);
  const appUSDTx = await usdt.approve(VAULT, parseEther('100000000000000000'));
  await appUSDTx.wait()*/
  
  // const principalToken = await deploy("PrincipalToken")
  // const yourCollectible = await deploy("YourCollectible") // <-- add in constructor args like line 19 vvvv
  // const nftBond = await deploy("NFTBond",[principalToken.address])
  /*const principalTokenAddress = '0x04DF6e4121c27713ED22341E7c7Df330F56f289B'
  const nftBond = await deploy('BalancerNFTBond', [principalTokenAddress, VAULT, poolID])
  console.log(nftBond.address)
  */

  const addresses = []

  const initialBalances = [parseEther('10'), BigNumber.from('10000000')];



  

  const JOIN_KIND = 0;
  console.log(initialBalances)
  // Construct magic userData

  const initUserData =
      ethers.utils.defaultAbiCoder.encode(['uint256', 'uint256[]'],
      [
        JOIN_KIND,
        initialBalances,
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

  const vault = new ethers.Contract(VAULT, vaultABI, sender);

  let joinTx
  try {
    joinTx = await vault.joinPool(poolId, '0x26e630b8C0638BC0421Bf268F751f4030e942E43', '0x26e630b8C0638BC0421Bf268F751f4030e942E43', joinPoolRequest);

  } catch(error) {
    console.log(error)
    console.log('----------------')
  }
  // You can wait for it like this, or just print the tx hash and monitor
  const joinReceipt = await joinTx.wait();
  console.log(joinReceipt)
  //await nftBond.depo(parseEther('100'), initUserData)


  //const yourContract = await ethers.getContractAt('YourContract', "0xaAC799eC2d00C013f1F11c37E654e59B0429DF6A") //<-- if you want to instantiate a version of a contract at a specific address!
  //const secondContract = await deploy("SecondContract")

  // const exampleToken = await deploy("ExampleToken")
  // const examplePriceOracle = await deploy("ExamplePriceOracle")
  // const smartContractWallet = await deploy("SmartContractWallet",[exampleToken.address,examplePriceOracle.address])

  /*
  //If you want to send value to an address from the deployer
  const deployerWallet = ethers.provider.getSigner()
  await deployerWallet.sendTransaction({
    to: "0x34aA3F359A9D614239015126635CE7732c18fDF3",
    value: ethers.utils.parseEther("0.001")
  })
  */


  /*
  //If you want to send some ETH to a contract on deploy (make your constructor payable!)
  const yourContract = await deploy("YourContract", [], {
  value: ethers.utils.parseEther("0.05")
  });
  */


  /*
  //If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  const yourContract = await deploy("YourContract", [], {}, {
   LibraryName: **LibraryAddress**
  });
  */


  //If you want to verify your contract on tenderly.co (see setup details in the scaffold-eth README!)
  /*
  await tenderlyVerify(
    {contractName: "YourContract",
     contractAddress: yourContract.address
  })
  */

  // If you want to verify your contract on etherscan
  /*
  console.log(chalk.blue('verifying on etherscan'))
  await run("verify:verify", {
    address: yourContract.address,
    // constructorArguments: args // If your contract has constructor arguments, you can pass them as an array
  })
  */

  console.log(
    " 💾  Artifacts (address, abi, and args) saved to: ",
    chalk.blue("packages/hardhat/artifacts/"),
    "\n\n"
  );
};

const deploy = async (contractName, _args = [], overrides = {}, libraries = {}) => {
  console.log(` 🛰  Deploying: ${contractName}`);

  const contractArgs = _args || [];
  console.log(contractArgs)
  const contractArtifacts = await ethers.getContractFactory(contractName,{libraries: libraries});
  const deployed = await contractArtifacts.deploy(...contractArgs, overrides);
  const encoded = abiEncodeArgs(deployed, contractArgs);
  fs.writeFileSync(`artifacts/${contractName}.address`, deployed.address);

  let extraGasInfo = ""
  if(deployed&&deployed.deployTransaction){
    const gasUsed = deployed.deployTransaction.gasLimit.mul(deployed.deployTransaction.gasPrice)
    extraGasInfo = `${utils.formatEther(gasUsed)} ETH, tx hash ${deployed.deployTransaction.hash}`
  }

  console.log(
    " 📄",
    chalk.cyan(contractName),
    "deployed to:",
    chalk.magenta(deployed.address)
  );
  console.log(
    " ⛽",
    chalk.grey(extraGasInfo)
  );

  await tenderly.persistArtifacts({
    name: contractName,
    address: deployed.address
  });

  if (!encoded || encoded.length <= 2) return deployed;
  fs.writeFileSync(`artifacts/${contractName}.args`, encoded.slice(2));

  return deployed;
};


// ------ utils -------

// abi encodes contract arguments
// useful when you want to manually verify the contracts
// for example, on Etherscan
const abiEncodeArgs = (deployed, contractArgs) => {
  // not writing abi encoded args if this does not pass
  if (
    !contractArgs ||
    !deployed ||
    !R.hasPath(["interface", "deploy"], deployed)
  ) {
    return "";
  }
  const encoded = utils.defaultAbiCoder.encode(
    deployed.interface.deploy.inputs,
    contractArgs
  );
  return encoded;
};

// checks if it is a Solidity file
const isSolidity = (fileName) =>
  fileName.indexOf(".sol") >= 0 && fileName.indexOf(".swp") < 0 && fileName.indexOf(".swap") < 0;

const readArgsFile = (contractName) => {
  let args = [];
  try {
    const argsFile = `./contracts/${contractName}.args`;
    if (!fs.existsSync(argsFile)) return args;
    args = JSON.parse(fs.readFileSync(argsFile));
  } catch (e) {
    console.log(e);
  }
  return args;
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// If you want to verify on https://tenderly.co/
const tenderlyVerify = async ({contractName, contractAddress}) => {

  let tenderlyNetworks = ["kovan","goerli","mainnet","rinkeby","ropsten","matic","mumbai","xDai","POA"]
  let targetNetwork = process.env.HARDHAT_NETWORK || config.defaultNetwork

  if(tenderlyNetworks.includes(targetNetwork)) {
    console.log(chalk.blue(` 📁 Attempting tenderly verification of ${contractName} on ${targetNetwork}`))

    await tenderly.persistArtifacts({
      name: contractName,
      address: contractAddress
    });

    let verification = await tenderly.verify({
        name: contractName,
        address: contractAddress,
        network: targetNetwork
      })

    return verification
  } else {
      console.log(chalk.grey(` 🧐 Contract verification not supported on ${targetNetwork}`))
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
