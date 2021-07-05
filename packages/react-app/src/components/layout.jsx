import React from "react";
import Aside from "./aside";
import Account from "./Account";

const Layout = ({
  address,
  localProvider,

  userSigner,
  price,
  loadWeb3Modal,
  logoutOfWeb3Modal,
  blockExplorer,
  web3Modal,
  mainnetProvider,
  children
}) => {
  return (
    <div className="h-screen w-screen bg-gray-900 flex">
      <Aside />

      <main className="w-full py-8 px-16">
        <header className="w-full">
          <div className="flex justify-end">
            <Account
              address={address}
              localProvider={localProvider}
              userSigner={userSigner}
              mainnetProvider={mainnetProvider}
              price={price}
              web3Modal={web3Modal}
              loadWeb3Modal={loadWeb3Modal}
              logoutOfWeb3Modal={logoutOfWeb3Modal}
              blockExplorer={blockExplorer}
            />
          </div>
        </header>
        {children}
      </main>
    </div>
  );
};
export default Layout;
