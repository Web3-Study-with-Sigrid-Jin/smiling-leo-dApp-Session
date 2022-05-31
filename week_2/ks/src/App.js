import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";

const TWITTER_HANDLE = 'BeModestDotEth';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

// Etherscan Verified contract address
const CONTRACT_ADDRESS = "0x9D8FC64b9A21a0DB86f2ed8f21B20785873DA241";

const App = () => {

  const [walletDetector, setWalletDetector] = useState(false);
  const { ethereum } = window;

  const detectWallet = () => {
    // Step 1: Check whether Metamask wallet is connected or not
    if (!ethereum) {
        console.log("Metamask not installed");
        setWalletDetector(false);
        } else {
        console.log("We have the ethereum wallet object", ethereum);
        setWalletDetector(true);
        }
  };

  useEffect(() => {
      detectWallet();
  });
  
  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">Transfer MTTT!</p>
          <p className="sub-text">
          {walletDetector ? 'Wallet Detected.' : 'No Wallet Detected.'}
          </p>
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;