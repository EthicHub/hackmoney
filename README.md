#  EthicHub: From Yield Farmers to Actual Farmers

Our project wants to create a PoC connecting yield farmers with actual farmers.

Users will add stable coin liquidity (fixed interest, fixed maturity bond) to a lending pool, representing the bond with an NFT
Pool will be investing in impact projects (financing smallholder farmers @ ethichub.com) and DeFi aggregators, rebalancing as needed

[Entry in HackMoney2021](EthicHub: Yield Farmers to Actual Farmers ยท ETHGlobal Showcase)

[https://www.figma.com/proto/LUPiPNxYOkwqz8GRgBEZDs/Hackathon?node-id=86%3A61&scaling=min-zoom](Figma Design)

Deployed Contracts:

Network: Kovan
- NFTBond: 0x61554676402d5d2533e573d816DDA79a8ffAb1Df
- EthicHubAssetManager: 0xB352Ab9D2048fFFCe08eaf10b4358b230285AE4C
- FarmerBorrowing: 0x1ec8bb258f2DbE3C07Fc1E2Bcf8Ad074f4c77d5e
- Pile (Farmer debt manager): 0xb835BdEA4467Ddb013081594b035FEb5D852e28B
- Balancer Pool ID: 0xCE3E75704E3446AF8871639886ADC7E007B232ED0002000000000000000000DA


# ๐ Based on scaffold-eth - ๐ Simple NFT Example

> Mint and display NFTs on Ethereum with a full example app...

---

## ๐โโ๏ธ Quick Start

required: [Node](https://nodejs.org/dist/latest-v12.x/) plus [Yarn](https://classic.yarnpkg.com/en/docs/install/) and [Git](https://git-scm.com/downloads)

```bash
git clone https://github.com/austintgriffith/scaffold-eth.git simple-nft-example

cd simple-nft-example

git checkout simple-nft-example
```

```bash

yarn install

```

```bash

yarn start

```

> in a second terminal window:

```bash
cd simple-nft-example
yarn chain

```

> in a third terminal window:

```bash
cd simple-nft-example
yarn deploy

```

๐ฑ Open http://localhost:3000 to see the app

---

> โ๏ธ Edit the mint script `mint.js` in `packages/hardhat/scripts` and update the `toAddress` to your frontend address (wallet address in the top right or localhost:3000).

![image](https://user-images.githubusercontent.com/2653167/109536489-03e77a80-7a7b-11eb-8464-4876dc22547c.png)

> in a terminal window run the **mint** script:

```bash

yarn mint

```

![image](https://user-images.githubusercontent.com/2653167/109536688-44df8f00-7a7b-11eb-9382-7205f927c628.png)

๐ You should see your collectibles show up if you minted to the correct address:

![image](https://user-images.githubusercontent.com/2653167/109536827-6c365c00-7a7b-11eb-8482-2a7bb33a1bb5.png)

๐ Open an _incognito_ window and navigate to http://localhost:3000 (You'll notice it has a new wallet address).

โฝ๏ธ Grab some gas for each account using the faucet:

![image](https://user-images.githubusercontent.com/2653167/109543971-35b10f00-7a84-11eb-832e-36d6b66afbe7.png)

๐ Send an NFT to the _incognito_ window address:

![image](https://user-images.githubusercontent.com/2653167/109536955-925bfc00-7a7b-11eb-855d-bf1523ac524d.png)

<br/>

๐ต๐ปโโ๏ธ Inspect the `Debug Contracts` tab to figure out what address is the `owner` of `YourCollectible`?

๐ผ Edit your deployment script `deploy.js` in `packages/hardhat/scripts`

---

๐ Edit your smart contract `YourCollectible.sol` in `packages/hardhat/contracts`

๐ Edit your frontend `App.jsx` in `packages/react-app/src`

๐ Create wallet links to your app with `yarn wallet` and `yarn fundedwallet`

โฌ๏ธ Installing a new package to your frontend? You need to `cd packages/react-app` and then `yarn add PACKAGE`

## ๐ก Deploy NFT smart contract!

๐ฐ Ready to deploy to a testnet?

> Change the `defaultNetwork` in `packages/hardhat/hardhat.config.js`

![image](https://user-images.githubusercontent.com/2653167/109538427-4d38c980-7a7d-11eb-878b-b59b6d316014.png)

๐ Generate a deploy account with `yarn generate`

![image](https://user-images.githubusercontent.com/2653167/109537873-a2c0a680-7a7c-11eb-95de-729dbf3399a3.png)

๐ View your deployer address using `yarn account` (You'll need to fund this account. Hint: use an [instant wallet](https://instantwallet.io) to fund your account via QR code)

![image](https://user-images.githubusercontent.com/2653167/109537339-ff6f9180-7a7b-11eb-85b0-46cd72311d12.png)

๐จโ๐ค Deploy your NFT smart contract:

```bash
yarn deploy
```

---

---

> โ๏ธ Edit your frontend `App.jsx` in `packages/react-app/src` to change the `targetNetwork` to wherever you deployed your contract:

![image](https://user-images.githubusercontent.com/2653167/109539175-3e9ee200-7a7e-11eb-8d26-3b107a276461.png)

You should see the correct network in the frontend:

![image](https://user-images.githubusercontent.com/2653167/109539305-655d1880-7a7e-11eb-9385-c169645dc2b5.png)

An instant wallet running on xDAI insired by [xdai.io](https://xdai.io).

๐ซ Ready to mint a batch of NFTs for reals?

```bash
yarn mint

await tenderlyVerify(
  {contractName: "YourContract",
   contractAddress: yourContract.address
})
```

Make sure your target network is present in the hardhat networks config, then either update the default network in `hardhat.config.js` to your network of choice or run:

```
yarn deploy --network NETWORK_OF_CHOICE
```

Once verified, they will then be available to view on Tenderly!

![image](https://user-images.githubusercontent.com/2653167/109539529-a5240000-7a7e-11eb-8d58-6dd7a14e1454.png)

## โ๏ธ Side Quests

#### ๐ Open Sea

> Add your contract to OpenSea ( create -> submit NFTs -> "or add an existing contract" )

(It can take a while before they show up, but here is an example:)

https://testnets.opensea.io/assets/0xc2839329166d3d004aaedb94dde4173651babccf/1

---

#### ๐ Etherscan Contract Verification

> run `yarn flatten > flat.txt` (You will need to clean up extra junk at the top and bottom of flat.txt. Sorry, rookie stuff here.)

> copy the contents of `flat.txt` to the block explorer and select compiler `v0.6.7` and `Yes` to `Optimization` (200 runs if anyone asks)

![image](https://user-images.githubusercontent.com/2653167/109540618-f84a8280-7a7f-11eb-9a34-c239f1271247.png)

---

#### ๐ถ Infura

> You will need to get a key from [infura.io](https://infura.io) and paste it into `constants.js` in `packages/react-app/src`:

![image](https://user-images.githubusercontent.com/2653167/109541146-b5d57580-7a80-11eb-9f9e-04ea33f5f45a.png)

---

## ๐ณ Ship the app!

> โ๏ธ build and upload your frontend and share the url with your friends...

```bash

# build it:

yarn build

# upload it:

yarn surge

Join the telegram [support chat ๐ฌ](https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA)  to ask questions and find others building with ๐ scaffold-eth!

yarn s3

===================================================== [โซ back to the top โซ](https://github.com/austintgriffith/scaffold-eth#-scaffold-eth)

yarn ipfs
```

![image](https://user-images.githubusercontent.com/2653167/109540985-7575f780-7a80-11eb-9ebd-39079cc2eb55.png)

> ๐ฉโโค๏ธโ๐จ Share your public url with a friend and ask them for their address to send them a collectible :)

![transfernft2](https://user-images.githubusercontent.com/2653167/109542105-df42d100-7a81-11eb-9e3a-7cc1f1ee0fb7.gif)
