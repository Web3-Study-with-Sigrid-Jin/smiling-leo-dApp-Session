import './styles/App.css';
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import ATNToken from './utils/ATNToken.json';

const CONTRACT_ADDRESS ="0x56f3532eDEeb1D88757E81CB7E8030b278381d7b";

const App=()=>{

  const checkMetamask = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Make sure you have metamask!");
      return;
    } else {
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      alert("metamask " ,accounts[0]);
    }
      

  }

  
  
  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">My ERC20 Token Transfer Web App</p>
          <p className="sub-text">
            Long Live Smiling Leo, Long Live DSRV!
          </p>
          {checkMetamask()}
        </div>
      </div>
    </div>
  );


}




export default App;
