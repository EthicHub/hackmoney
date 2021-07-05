import { NavLink } from "react-router-dom";
import React from "react";






const Aside = () => {
  return (
    <aside className="w-1/5 h-full border-r-2 border-gray-700">
      <img className="p-8" src="./icons/logo-white.svg" alt="logo" />
      <nav>
        <ul className="flex flex-col text-white  ">
          <li className="w-5/6 hover:bg-gray-700 rounded h-12 flex items-center p-4 m-4 cursor-pointer ">
            <img className="mr-4" src="./icons/bond-icon.svg" alt="bonds icon" />
            <NavLink className="w-full" to="/bonds">
              Bonds
            </NavLink>
          </li>
          <li className="w-5/6  hover:bg-gray-700 rounded h-12 flex items-center p-4 m-4  cursor-pointer ">
            <img className="mr-4" src="./icons/farm-icon.svg" alt="bonds icon" />
            <NavLink className="w-full" to="/farms">
              Farms
            </NavLink>
          </li>
          <li className="w-5/6 hover:bg-gray-700 rounded h-12 flex items-center p-4 m-4  cursor-pointer ">
            <img className="mr-4" src="./icons/borrow-icon.svg" alt="bonds icon" />
            <NavLink className="w-full" to="/borrow">
              Borrow
            </NavLink>
          </li>
          <li className="w-5/6 hover:bg-gray-700 rounded h-12 flex items-center p-4 m-4  cursor-pointer ">
            <img className="mr-4" src="./icons/stat-icon.svg" alt="bonds icon" />
            <NavLink className="w-full" to="/stats">
              Stats
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Aside;
