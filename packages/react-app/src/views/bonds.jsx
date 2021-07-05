import React from "react";
import Layout from "../components/layout";

const Card = () => {
  return (
    <div className=" flex flex-col justify-between bg-gray-900 rounded-md  p-4 ">
      <div className=" bg-farm2">
        <p className=" text-xs font-light text-white">BORROWER</p>
        <p className=" text-xs  font-medium text-white">Peru Co-op</p>
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

const Bonds = () => {
  return (
    <Layout>
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
              <div className="flex  pt-4">
                <img src="./icons/dai-icon.svg" alt="dai icon" />
                <p className="text-white">$1,500.43</p>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4">
              <p className="text-white text-xs font-light ">Profits</p>
              <div className="flex  pt-4">
                <img src="./icons/dai-icon.svg" alt="dai icon" />
                <p className="text-green-500">$1,500.43</p>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4">
              <p className="text-white text-xs font-light ">Available for withdrawl</p>
              <div className="flex  pt-4">
                <img src="./icons/dai-icon.svg" alt="dai icon" />
                <p className="text-white"> $1,500.43</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Bonds;
