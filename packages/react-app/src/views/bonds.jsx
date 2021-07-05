import React from "react";
import Layout from "../components/layout";
import { Input, Select, InputNumber } from "antd";

const { Option } = Select;
const Card = () => {
  return (
    <div className=" flex flex-col justify-between bg-gray-900 rounded-md  p-4  ">
      <div className=" relative  h-32">
        <div className="relative z-30 ">
          <p className=" text-xs font-medium text-white">BORROWER</p>
          <p className=" text-xs  font-medium text-white">Peru Co-op</p>
        </div>
        <img className="absolute top-0 right-0 w-full z-0 " src="./farm1.png" alt="farm" />
      </div>

      <div>
        <div>
          <p className="text-xs text-green-600">APY</p>
          <p className=" text-xs font-light text-white">8%</p>
        </div>
        <div>
          <p className=" text-xs font-light  text-yellow-500">MATURITY</p>
          <p className=" text-xs font-light text-white">12 Months</p>
        </div>
      </div>
      <button className=" text-sm font-light text-white bg-green-500  w-full rounded h-8">Buy Bond</button>
    </div>
  );
};

const Buy1 = () => {
  return (
    <div className=" flex flex-col justify-between bg-gray-900 rounded-md  p-4  w-60">
      <h2 className="text-center text-white">Buy Bond</h2>
      <Input.Group compact className="rounded">
        <Select className=" bg-gray-700 text-white " defaultValue="DAI">
          <Option value="DAI">DAI</Option>
          <Option value="Option2">Option2</Option>
        </Select>
        <Input
          style={{ width: "60%", backgroundColor: "transparent" }}
          defaultValue="0.0"
          className=" bg-gray-700 text-white "
        />
      </Input.Group>
      <div className="flex space-x-4">
        <button className="rounded-md bg-gray-700 p-2 border-green-400" type="button">
          12 Months
        </button>
        <button className="rounded-md bg-gray-700 p-2" type="button">
          6 months
        </button>
      </div>
      <input className="rounded-md bg-gray-700 p-2" type="number" />
    </div>
  );
};
const Bonds = ({
  address,
  localProvider,

  userSigner,
  price,
  loadWeb3Modal,
  logoutOfWeb3Modal,
  blockExplorer,
  web3Modal,
  mainnetProvider,
}) => {
  return (
    <Layout
      address={address}
      localProvider={localProvider}
      userSigner={userSigner}
      mainnetProvider={mainnetProvider}
      price={price}
      web3Modal={web3Modal}
      loadWeb3Modal={loadWeb3Modal}
      logoutOfWeb3Modal={logoutOfWeb3Modal}
      blockExplorer={blockExplorer}
    >
      <div className="w-full h-full `">
        <header className="w-full ">
          <h1 className="text-3xl text-white">Bonds Available</h1>
        </header>
        
        <div id="container " className=" grid grid-cols-2 gap-8">
          <div className="grid bg-gray-700 rounded-md grid-cols-2 gap-4 p-4 box-border ">
            <Card />
            <Card />
          </div>
          <div id="Peformance" className="flex flex-col justify-between bg-gray-700 rounded-md p-4 space-y-4">
            <h3>Peformance</h3>

            <div className="bg-gray-900 rounded-lg p-4">
              <p className="text-white text-xs font-light ">Total invested</p>
              <div className="flex pt-4">
                <img src="./icons/dai-icon.svg" alt="dai icon" />
                <p className="text-white flex items-center mb-0">$1,500.43</p>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4">
              <p className="text-white text-xs font-light ">Profits</p>
              <div className="flex  pt-4">
                <img src="./icons/dai-icon.svg" alt="dai icon" />
                <p className="text-green-500  mb-0">$1,500.43</p>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4">
              <p className="text-white text-xs font-light ">Available for withdrawl</p>
              <div className="flex  pt-4">
                <img src="./icons/dai-icon.svg" alt="dai icon" />
                <p className="text-white  mb-0" > $1,500.43</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Bonds;
