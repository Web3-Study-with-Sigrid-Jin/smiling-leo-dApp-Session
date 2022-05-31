import './styles/App.css';
import abi from './utils/MTTT-abi.json'
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

        try {
            // 이게 있어에 메타마스크가 없을 때 에러를 띄울 수 있다.
            const { ethereum } = window;
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

            // Step 3: If not connected to Rinkeby Network, display message to request network change.
            const rinkebyChainId = "0x4";
            if (chainId !== rinkebyChainId) {
                alert("Change your network to Rinkeby!");
            }
            // State로 networkid를 받아 정확한 네트워크 연결이 안되어 있으면 아예 창을 안 뜨게 만들 수도 있을것
            // 만약 rinkeby 네트워크가 없다면 자동으로 PRC 추가를 해 주는 사이트도 있엇던데
            // 그거는 어떻게 구현하는걸까?

            // 지갑을 처음으로 연결할 때 이벤트 listener를 연결시킨다.
            setupEventListener()
        }
        catch(err) {
            console.log(err);
        }
    } 

    // Step 6: Set up eventListener to fetch emit event after transfer
    const setupEventListener = async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                // Connect to contract
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const myContract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

                // Setup listener
                myContract.on('Transfer', (from, to, amount) => {
                    console.log(from, to, amount);
                    alert(`Successfully Transferred from ${from} to ${to} with amount ${amount}!`);
                })

                console.log("Event listener initialized");
            }
            else {
                alert('get metamask!');
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    // Step 5: Execute ERC20 transfer method upon button click
    const contractTransfer = async () => {
        // arguments
        const to = toAddress;
        const amount = ethers.utils.parseEther((toAmount).toString());    
        console.log("to:", to, " | amount >>>>>>>> ", amount)
        console.log(abi)

        try {
            const { ethereum } = window;

            if (ethereum) {
                // Connect to contract
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const myContract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

                console.log('popup window')

                // Tx가 완전히 채굴되기까지 2번의 await을 거친다
                let tx = await myContract.transfer(to, amount)
                console.log('wait while tx is mined...');

                await tx.wait();

                if (tx) {
                    console.log(tx);
                    console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${tx.hash}`);
                }
            }
            else {
                alert('Get Metamask!');
            }
        }
        catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, [currentAccount]);
    
    const renderNotConnectedContainer = () => (
        <button onClick={connectWallet} className="cta-button connect-wallet-button">
        Connect to Wallet
        </button>
    );

    const TransferUI = () => (
        <div>
            {/* State 이용해서 입력하는 값을 저장 */}
            {/* Step 4: Inputs for ethereum address & amount */}
            <input type="text" value={toAddress} placeholder='where to send' onChange={e => {setToAddress(e.target.value);}}></input>
            <input type="text" value={toAmount} placeholder='how much to send' onChange={e => {setToAmount(e.target.value);}}></input>
            <div>
                    <button onClick={contractTransfer} className="cta-button connect-wallet-button">
                        Transfer
                    </button>
                    <button onClick={''} className="cta-button connect-wallet-button">
                        Burn
                    </button>
            </div>
        </div>
    )

    // Amount를 바꾸고 바로 transfer를 누르면 그 수치기 제대로 반영이 되지 않을 수도 있으니까
    useEffect(() => {
        const timer = setTimeout(() => {
        console.log('timee is working...')
        }, 500)
        return () => clearTimeout(timer)
    }, [toAmount])

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