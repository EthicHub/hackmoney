import React from "react";
import Aside from "./aside";

const Layout = props => {
  return (
    <div className="h-screen w-screen bg-gray-900 flex">
      <Aside />

      <main className="w-full py-8 px-16">
        <header className="w-full">
          <div className="flex justify-end">
            <div className="flex items-center justify-around bg-gray-700 rounded text-white h-12 w-36 mx-2">
              <img src="./icons/dai-icon.svg" alt="dai icon" />
              <p>$1,000</p>
              <img src="./icons/upload-icon.svg" alt="upload icon" />
              <img src="./icons/meta-icon.svg" alt="metamask icon" />
            </div>
            <button className="flex  items-center justify-center rounded bg-green-500  text-white  h-12 w-36  mx-2">
              0x939412
            </button>
            <button>
              <span className="text-center text-white font-bold text-2xl w-12   mx-2 h-12">&#8230;</span>
            </button>
          </div>
        </header>
        {props.children}
      </main>
    </div>
  );
};
export default Layout;
