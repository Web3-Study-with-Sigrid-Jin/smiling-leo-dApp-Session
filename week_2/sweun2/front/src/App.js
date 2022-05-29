import './styles/App.css';
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import ATNToken from './utils/ATNToken.json';

const CONTRACT_ADDRESS ="0x56f3532eDEeb1D88757E81CB7E8030b278381d7b";

const App=()=>{
  const [currentAccount, setCurrentAccount] = useState("");
  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("metamask " );
    }
    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account)

      // Setup listener! This is for the case where a user comes to our site
      // and ALREADY had their wallet connected + authorized.
    } else {
      console.log("No authorized account found")
    }

  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);

      checkChainId();
      // String, hex code of the chainId of the Rinkebey test network
      // Setup listener! This is for the case where a user comes to our site
      // and connected their wallet for the first time.
    } catch (error) {
      console.log(error)
    }
  }
  /// checkChainID
  const checkChainId= async ()=>{
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      var chainId = await ethereum.request({ method: 'eth_chainId' });
      alert("Connected to chain " + chainId);
      const rinkebyChainId = "0x4";
      if (chainId !== rinkebyChainId) {
        alert("You are not connected to the Rinkeby Network!");
      }
      // String, hex code of the chainId of the Rinkebey test network
      // Setup listener! This is for the case where a user comes to our site
      // and connected their wallet for the first time.
    } catch (error) {
      console.log(error)
    }
  }
  
  const askContractToTransfer = async () => {
    checkChainId();
  }
  
  useEffect(() => {
    checkIfWalletIsConnected();
  })

  const renderNotConnectedContainer = () => (
    <button onClick={connectWallet} className="cta-button connect-wallet-button">
      Connect to Wallet
    </button>
  );
  
  const TransferUI = () => (
    <div>
          
          <button onClick={askContractToTransfer} className="cta-button connect-wallet-button">
            Transfer
          </button>
    </div>
  )

  

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">My ERC20 Token Transfer Web App</p>
          <p className="sub-text">
            Long Live Smiling Leo, Long Live DSRV!
          </p>
          {currentAccount === "" ? renderNotConnectedContainer() : TransferUI()}
        </div>
        
      </div>
    </div>
  );


}




export default App;
