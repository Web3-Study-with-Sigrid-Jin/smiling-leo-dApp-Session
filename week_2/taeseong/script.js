import {ethers} from "./ethers-5.6.esm.min.js"
import TSToken from "./contracts/TSToken.json" assert{ type: "json" }

const main = async () => {
    window.currentUser = {
        account: null
      };

    const { ethereum } = window;
    const transferButton = document.getElementById("transfer");
    const burnButton = document.getElementById("burn");
    const rinkebyChainId = "0x4";

    if(!ethereum) return;

    connectWallet();
    checkChain(rinkebyChainId);
    await setupTransferListener();

    transferButton.addEventListener("click", askContractToTransfer);
    burnButton.addEventListener("click", askContractToBurn);
};

main();

async function connectWallet() {
    const { ethereum } = window;

    try {
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });

        if(accounts.length !== 0) {
            console.log("Connected", accounts[0]);
            window.currentUser.account = accounts[0];
        }
    } catch (error) {
        console.log(error);
    }
}

async function checkChain(myChainId) {
    let chainId = await ethereum.request({ method: 'eth_chainId' });
    console.log("Connected to chain " + chainId);

    if (chainId !== myChainId) {
      alert("You are not connected to the Rinkeby Network!");
    }
}

async function setupTransferListener() {
    const { ethereum } = window;

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const connectedContract = new ethers.Contract(TSToken.contractAddress, TSToken.abi, signer);

    connectedContract.on("Transfer", (from, to, value) => {
        console.log(from, to, value);
        alert(`토큰이 전송 (transfer) 되었어요! ${from}에서 ${to}로 ${value} 만큼 보냈어요!`);
    });

    console.log("Setup event listener!");
}

async function askContractToTransfer() {
    const to = document.getElementById("toAddress").value;
    const toAmount = document.getElementById("toAmount").value;

    const amount = ethers.utils.parseEther((toAmount).toString());
    console.log("amount >>>>>>>> ", amount);

    const { ethereum } = window;

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const connectedContract = new ethers.Contract(TSToken.contractAddress, TSToken.abi, signer);

    console.log("Going to pop wallet now to pay gas...");
    let tx = await connectedContract.transfer(to, amount);

    console.log("Mining...please wait.");
    await tx.wait();
    console.log(tx);
    console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${tx.hash}`);
  }

async function askContractToBurn() {
    const to = document.getElementById("toAddress").value;
    const toAmount = document.getElementById("toAmount").value;

    const amount = ethers.utils.parseEther((toAmount).toString());
    console.log("amount >>>>>>>> ", amount);

    const { ethereum } = window;

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const connectedContract = new ethers.Contract(TSToken.contractAddress, TSToken.abi, signer);

    console.log("Going to pop wallet now to pay gas...");
    let tx = await connectedContract.burn(amount);

    console.log("Mining...please wait.");
    await tx.wait();
    console.log(tx);
    console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${tx.hash}`);
  }