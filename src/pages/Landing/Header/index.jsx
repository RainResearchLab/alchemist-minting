import "./index.scss";

// import react router
import { Link, useSearchParams } from "react-router-dom";
// Context
import React, { useReducer, useContext } from 'react';
// import wagmi
import { useAccount, useDisconnect } from "wagmi";
// Context
import UserContext from '../../../components/User/User';
// import components
import { PrimaryButton, SecondaryButton } from "../../../components/Buttons";

// import context
import { useConnectWalletModal } from "../../../contexts/ConnectWalletModalContext";

// import icons
import { SlWallet } from "react-icons/sl";
import { FaBook } from "react-icons/fa";
import { GiHamburgerMenu, GiReturnArrow } from "react-icons/gi";
import { useState } from "react";
let loaded = false
const coins = [
  { value: 'ETH', text: 'Wrapped Ethereum (WETH)'},
  { value: 'USDC', text: 'USD Coin (USDC)' },
  { value: 'DAI', text: 'DAI Algo Stable (DAI)' },
  { value: 'BUSD', text: 'Binance USD (BUSD)' },
  { value: 'XMINT', text: 'Credit Card (Xmint)' }
]

const AccountButton = ({ address, onDisconnect }) => {
  return (
    <div className="dropdown show">
      <div
        className="dropdown-toggle account-address-panel"
        id="accountDropDown"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {address
          ? address.slice(0, 6) + "..." + address.slice(-3)
          : "No Address"}
      </div>

      <div className="dropdown-menu m-0" aria-labelledby="accountDropDown">
        <div className="dropdown-item" onClick={onDisconnect}>
          Disconnect
        </div>
      </div>
    </div>
  );
};

const CoinSelector = () => {
  const [activeCoin, setActiveCoin] = useState('Wrapped Ethereum (WETH)');
  const {
    currentUser,
    setCurrentUser
  } = useContext(UserContext)
  if(!loaded){
    loaded = true
    setCurrentUser({ toMintWith: "Wrapped Ethereum (WETH)" })  
  }
  return (
    <div class="dropdown coin-selector show">
      <div class="dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false">
        {activeCoin}
      </div>

      <ul class="dropdown-menu">
        {coins.map((item, index) => <li key={`coin-${index}`} onClick={() => { 
          setActiveCoin(item.text) 
          setCurrentUser({ toMintWith: item.text })  
          console.log(currentUser)
      }}>{item.text}</li>
        )}
      </ul>
    </div>
  )
}

const Header = () => {
  const { address, connector, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const { show } = useConnectWalletModal();

  const onConnect = () => {
    show();
  };

  return (
    <>
      <nav className="navbar navbar-expand-sm">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              alt="logo"
              className="logo-image"
              src={window.origin + "/logo.png"}
            />
          </Link>
          <div
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar"
          >
            <GiHamburgerMenu color="white" size={24} />
          </div>
          <div className="collapse navbar-collapse" id="navbar">
            <ul className="navbar-nav me-auto"></ul>
            <div className="d-flex align-items-center">
              <SecondaryButton
                text="DOCS"
                className="me-3"
                leftIcon={<FaBook />}
              />

              <CoinSelector />
              {isConnected ? (
                <AccountButton address={address} onDisconnect={disconnect} />
              ) : (
                <PrimaryButton
                  text="CONNECT"
                  leftIcon={<SlWallet />}
                  onClick={onConnect}
                />
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
