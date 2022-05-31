import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";

const TWITTER_HANDLE = 'BeModestDotEth';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

// Etherscan Verified contract address
const CONTRACT_ADDRESS = "0x9D8FC64b9A21a0DB86f2ed8f21B20785873DA241";

const App = () => {

    const [currentAccount, setCurrentAccount] = useState("");
    const [toAddress, setToAddress] = useState("");
    const [toAmount, setToAmount] = useState("");

    // Step 1: Check whether Metamask wallet is connected or not
    const checkIfWalletIsConnected = async () => {
        console.log('--------------\n', 'step 1')

        // 있으나 없으나 큰 차이는 없는 것 같다. 이것이 있는 이유는?
        const { ethereum } = window;

        if (!ethereum) {
            console.log("Metamask not installed");
            } else {
            console.log("We have the ethereum wallet object", ethereum);
            console.log(typeof(ethereum)); // Object
            }

        // eth_accounts: 현재 사이트에 연결되어 있는 지갑 주소들을 array로 가져온다.
        // 이게 없으면 지갑이 연결되어도 연결된 지갑을 가져올 수 없다.
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        console.log(accounts); // Array

        if (accounts.length !== 0) {
            // Set first account as current accuount
            const account = accounts[0]
            console.log("Found an connected account:", account);
            setCurrentAccount(account)
        }
        else {
            console.log('Account not connected')
        }
    };

    // Connect 없이 로드를 했을 때는 지갑이 있다는 것은 인식을 하지만
    // 지갑을 웹과 바로 연결하지는 않는다.

    // Step 2: If metamask is installed, connect metamask with website
    const connectWallet = async () => {
        console.log('--------------\n', 'step 2')

        if (!ethereum) {
            alert("Get MetaMask!");
            return;
        }

        // 메타마스크가 지갑에 있는 계정들을 UI로 보여준다.
        // 유저가 선택한 지갑들을 array로 가져온다
        // 몇 개를 체크하든, 현재 사용중인 지갑만 length 1인 array로 가져온다
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        console.log("Connected", accounts[0]);
        // State와 Effect 작업을 해 줘야 연결하자마자 화면이 바뀐다
        setCurrentAccount(accounts[0]);
  
        // CahinID를 16진수 string으로 가져온다
        let chainId = await ethereum.request({ method: 'eth_chainId' });
        console.log("Connected to chain " + chainId);
    } 

  useEffect(() => {
    checkIfWalletIsConnected();
  });
  
  const renderNotConnectedContainer = () => (
    <button onClick={connectWallet} className="cta-button connect-wallet-button">
      Connect to Wallet
    </button>
  );

  const TransferUI = () => (
    <div>
        {/* State 이용해서 입력하는 값을 저장 */}
          <input type="text" value={toAddress} placeholder='where to send' onChange={e => { setToAddress(e.target.value) }}></input>
          <input type="text" value={toAmount} placeholder='how much to send' onChange={(e) => setToAmount(e.target.value)}></input>
          <div>
            <button onClick={''} className="cta-button connect-wallet-button">
                Transfer
            </button>
          </div>
    </div>
  )

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">Transfer MTTT!</p>
          <p className="sub-text">
          Long Live Smiling Leo, Long Live DSRV!
          </p>
          {currentAccount === "" ? renderNotConnectedContainer() : TransferUI()}
    <div className="footer-container">
        </div>
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