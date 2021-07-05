import React from "react";
import Layout from "../components/layout";

const Stats = () => {
  return (
    <Layout>
      <div className="w-full h-full `">
        <header className="w-full ">
          <h1 className="text-3xl text-white">Bonds Available</h1>
        </header>

        <div id="container " className=" grid grid-cols-2 gap-8">
          <div className="flex flex-col bg-gray-800 rounded-md  p-4 box-border ">
          <h3 className="text-xl text-white">Projects</h3>
          <div className="bg-gray-900 rounded-md flex justify-between p-4">
              <img  className="w-1/4" src="/farm2.png" alt="farm" />
              <div>
                <h3 className="text-white text-lg">Mexico Co-op</h3>
                <p className="text-md text-grey-200">Loan to harvest land</p>
                <h2 className="text-white text-lg">$100,000 DAI</h2>
              </div>
              <p>Returns Apr 07, 2021</p>
            </div>
          </div>

          <div id="Peformance" className="flex flex-col justify-between bg-gray-800 rounded-md p-4 space-y-4">
            <h3 className="text-xl text-white">Overview</h3>
            
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Stats;
